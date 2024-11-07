<body>
<div>
# IP Info Tracker

A simple command-line tool to fetch detailed information about an IP address, including country, city, ISP, and geolocation coordinates. Built with Node.js, it uses the [ipgeolocation.io](https://ipgeolocation.io/) and [ipwho.is](https://ipwho.is/) APIs.

## Features

- Retrieves IP information such as country, city, ISP, and organization.
- Provides geolocation coordinates (latitude and longitude).
- Displays results with clear formatting and emoji flags.

## Installation

To set up the project locally, follow these steps:

1. ***Install needed packages termux***

    ```bash
    pkg update
    pkg upgrade
    pkg install npm
    pkg install nodejs
    pkg install git
    pkg install yarn
    termux-setup-storage
    ```
    
2. ***Clone the repository:***

    ```bash
    git clone https://github.com/DFansyah/IPtrack.git
    cd IPtrack
   ```
   
3. ***For run this script***

    ```bash
    npm install or yarn install
    node index.js -i <IP>
    ```
</div>
</body>