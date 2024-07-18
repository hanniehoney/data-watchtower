const services = ['openai', 'anthropic'];

async function fetchServiceData(service) {
  const response = await fetch(`services/${service}.json`);
  return response.json();
}

async function generateTable() {
  const table = document.getElementById('comparison-table');
  const thead = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');

  // Fetch all service data
  const servicesData = await Promise.all(services.map(fetchServiceData));

  // Generate header
  const emptyTh = document.createElement('th');
  emptyTh.className = "feature-column";
  thead.appendChild(emptyTh);

  servicesData.forEach(service => {
    const th = document.createElement('th');
    th.innerHTML = `<a href="${service.website}" target="_blank">${service.name}</a>`;
    th.className = "chatbot-column";
    thead.appendChild(th);
  });

  // Generate rows
  const categories = [
    { name: "User", items: ["Data Controls", "Data Export"] },
    { name: "Security", items: ["Trust Center", "Encryption-at-rest", "Encryption-in-transit", "Access Control"] },
    { name: "Legal", items: ["Terms of Service (ToS)", "Privacy Policy", "Usage Policy", "Other Policies"] }
  ];

  categories.forEach(category => {
    const categoryRow = document.createElement('tr');
    categoryRow.innerHTML = `<td colspan="${services.length + 1}" class="category-name">${category.name}</td>`;
    tbody.appendChild(categoryRow);

    category.items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `<td class="feature-column">${item}</td>`;

      servicesData.forEach(service => {
        let content = '-';
        if (category.name === "Legal" || item === "Trust Center") {
          const policy = service.policies[item] || service.security[item];
          if (policy && policy.exists) {
            if (policy.links) {
              content = policy.links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join(', ');
            } else if (policy.link) {
              content = `<a href="${policy.link}" target="_blank">link</a>`;
            }
          }
        } else if (category.name === "Security") {
          const data = service[category.name.toLowerCase()][item];
          if (data && typeof data === 'object' && data.value && data.link) {
            content = `<a href="${data.link}" target="_blank">${data.value}</a>`;
          } else if (data) {
            content = data;
          }
        } else if (category.name === "User") {
          if (item === "Data Export") {
            const data = service[category.name.toLowerCase()][item];
            if (data && data.exists) {
              content = '✓';
              if (data.description) {
                content += `<span class="tooltip">${data.description}</span>`;
              }
            }
          } else {
            const data = service[category.name.toLowerCase()][item];
            if (data) {
              content = data;
            }
          }
        }
        row.innerHTML += `<td class="chatbot-column">${content}</td>`;
      });

      tbody.appendChild(row);
    });
  });
}

document.addEventListener('DOMContentLoaded', generateTable);