const comparisonData = {
    chatbots: [
        { name: "ChatGPT" },
        { name: "Claude" },
        { name: "Gemini" }
    ],
    categories: [
        {
            name: "Legal",
            items: [
                { name: "Terms of Service (ToS)", description: "Defines the overall legal relationship and rules for using the service." },
                { name: "Privacy Policy", description: "Explains how user data is collected, used, stored, and protected." },
                { name: "Usage Policy", description: "Outlines specific rules and guidelines for acceptable use of the service." },
                { name: "Data Processing Addendum (DPA)", description: "Specifies terms for processing personal data, often required for GDPR compliance." }
            ]
        },
        {
            name: "Security",
            items: [
                { name: "Encryption Methods", description: "Describes techniques used to protect data during storage and transmission." },
                { name: "Access Control", description: "Details measures to ensure only authorized personnel can access user data." }
            ]
        },
        {
            name: "User",
            items: [
                { name: "Data Controls", description: "Options provided to users for managing their personal data and privacy settings." },
                { name: "Data Export", description: "Functionality allowing users to download and transfer their personal data." }
            ]
        }
    ]
};

function generateTable() {
    const table = document.getElementById('comparison-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    // Generate header
    const featureTh = document.createElement('th');
    featureTh.textContent = "Feature";
    featureTh.className = "feature-column";
    thead.appendChild(featureTh);

    comparisonData.chatbots.forEach(chatbot => {
        const th = document.createElement('th');
        th.textContent = chatbot.name;
        th.className = "chatbot-column";
        thead.appendChild(th);
    });

    // Generate rows
    comparisonData.categories.forEach(category => {
        const categoryRow = document.createElement('tr');
        categoryRow.innerHTML = `<td colspan="${comparisonData.chatbots.length + 1}" class="category-name">${category.name}</td>`;
        tbody.appendChild(categoryRow);

        category.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="feature-name">
                    ${item.name}
                    <div class="description">${item.description}</div>
                </td>
            `;

            comparisonData.chatbots.forEach(() => {
                row.innerHTML += `<td>-</td>`;  // Placeholder, replace with actual data when available
            });

            tbody.appendChild(row);
        });
    });
}

document.addEventListener('DOMContentLoaded', generateTable);