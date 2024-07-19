let comparisonData = {
    chatbots: [
        { name: "OpenAI", website: "https://openai.com" },
        { name: "Anthropic", website: "https://www.anthropic.com" }
    ],
    categories: [
        {
            name: "User",
            items: [
                { name: "Data Controls", description: "Options provided to users for managing their personal data and privacy settings." },
                { name: "Data Export", description: "Functionality allowing users to download and transfer their personal data." }
            ]
        },
        {
            name: "Security",
            items: [
                { name: "Trust Center", description: "Central hub for security and compliance information." },
                { name: "Encryption-at-rest", description: "Method used to protect stored data." },
                { name: "Encryption-in-transit", description: "Method used to protect data during transmission." },
                { name: "Access Control", description: "Measures to ensure only authorized personnel can access user data." }
            ]
        },
        {
            name: "Legal",
            items: [
                { name: "Terms of Service (ToS)", description: "" },
                { name: "Privacy Policy", description: "" },
                { name: "Usage Policy", description: "" },
                { name: "Other Policies", description: "" }
            ]
        }
    ]
};

let chatbotData = {};

async function loadData() {
    try {
        const [openAIResponse, anthropicResponse] = await Promise.all([
            fetch('/services/openai.json'),
            fetch('/services/anthropic.json')
        ]);

        const openAIData = await openAIResponse.json();
        const anthropicData = await anthropicResponse.json();

        chatbotData["OpenAI"] = openAIData;
        chatbotData["Anthropic"] = anthropicData;

        generateTable();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function generateTable() {
    const table = document.getElementById('comparison-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    // Clear existing table content
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Generate header
    const emptyTh = document.createElement('th');
    emptyTh.className = "feature-column";
    thead.appendChild(emptyTh);

    comparisonData.chatbots.forEach(chatbot => {
        const th = document.createElement('th');
        th.innerHTML = `<a href="${chatbot.website}" target="_blank">${chatbot.name}</a>`;
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
                    ${category.name !== "Legal" ? `<span class="info-icon" title="${item.description}">?</span>` : ''}
                </td>
            `;

            comparisonData.chatbots.forEach(chatbot => {
                let content = '';
                let data;

                if (chatbotData[chatbot.name]) {
                    if (category.name === "User") {
                        data = chatbotData[chatbot.name].user[item.name];
                    } else if (category.name === "Security") {
                        data = chatbotData[chatbot.name].security[item.name];
                    } else if (category.name === "Legal") {
                        data = chatbotData[chatbot.name].policies[item.name];
                    }
                }

                if (data !== undefined && data !== null) {
                    if (data.exists === true || data.value || data.link) {
                        if (data.links) {
                            content = data.links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join(' , ');
                        } else if (data.link) {
                            content = data.value ? 
                                `<a href="${data.link}" target="_blank">${data.value}</a>` : 
                                `<a href="${data.link}" target="_blank">link</a>`;
                        } else if (data.value) {
                            content = data.value;
                        } else {
                            content = '✓';
                        }
                    } else if (data.exists === false) {
                        content = '✗';
                    } else {
                        content = '-';
                    }
                } else {
                    content = '-';
                }

                const description = data && data.description ? `title="${data.description}"` : '';
                row.innerHTML += `<td class="chatbot-column" ${description}>${content}</td>`;
            });

            tbody.appendChild(row);
        });
    });
}

document.addEventListener('DOMContentLoaded', loadData);