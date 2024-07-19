# Data Watchtower

Data Watchtower is a project that shines a light on how AI companies handle user data, breaking down data policies, security measures, and user controls in an easy-to-compare format.

## How to Contribute

### Adding a New Company

To add a new company to the comparison, follow these steps:

1. Copy the `template.json` file in the `services` directory.
2. Rename the copy to `[company-name].json` (e.g., `newcompany.json`).
3. Fill in the information for the new company following the structure in the template.
4. Add the new company to the `chatbots` array in `script.js`.

### Template Structure

The `template.json` file contains the following main sections:

- `name`: The name of the company
- `website`: The company's website URL
- `user`: User-related data practices
- `security`: Security measures
- `policies`: Legal documents and policies

### Categories and Definitions

#### User
- **Data Controls**: Options provided to users for managing their personal data and privacy settings.
- **Data Export**: Functionality allowing users to download and transfer their personal data.

#### Security
- **Trust Center**: Central hub for security and compliance information.
- **Encryption-at-rest**: Method used to protect stored data.
- **Encryption-in-transit**: Method used to protect data during transmission.
- **Access Control**: Measures to ensure only authorized personnel can access user data.

#### Legal
- **Terms of Service (ToS)**: The company's terms of service.
- **Privacy Policy**: The company's privacy policy.
- **Usage Policy**: Guidelines for using the company's services.
- **Other Policies**: Any additional relevant policies.

## Development

To run this project locally:

1. Clone the repository
2. Open `index.html` in your browser

For GitHub Codespaces or GitHub Pages deployment, the project should work out of the box.


## License

This project is currently provided without a specific license. All rights are reserved, and usage, modification, or distribution is not permitted without explicit permission.

A license may be added in the future to clarify the terms under which this project can be used and shared.