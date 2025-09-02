# Manjunath Portfolio Website

A modern, interactive terminal-style portfolio website built with Next.js and React. Features a realistic terminal interface with command execution, animated hanging ID card, and fully responsive design.

## Features

- **Interactive Terminal Interface**: Type commands to navigate through portfolio sections
- **Animated ID Card**: Physics-based hanging card animation with hover effects
- **Fully Responsive**: Optimized for both desktop and mobile devices
- **Command System**: Support for various commands like `help`, `about`, `projects`, `skills`, etc.
- **Modern Typography**: Uses Google Fonts (Inter, Domine, Open Sans)
- **Smooth Animations**: CSS animations and transitions throughout
- **Mobile Optimized**: ID card hidden on mobile, terminal-focused experience

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - Frontend library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Typography (Inter, Domine, Open Sans)
- **CSS Animations** - Custom animations and transitions

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd manjunath-portfolio-website-final
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

## Running the Project

### Development Mode

To run the project in development mode with hot reloading:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Production Build

To create an optimized production build:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

To start the production server:

\`\`\`bash
npm start
# or
yarn start
\`\`\`

## Available Commands

The terminal interface supports the following commands:

- `help` - Show all available commands
- `about` - Learn about Manjunath
- `skills` - View technical skills
- `projects` - Browse code projects
- `certifications` - View professional certifications
- `education` - Educational background
- `website-links` - Social media and coding profiles
- `contact` - Contact information
- `clear` - Clear terminal screen

## Project Structure

\`\`\`
manjunath-portfolio-website-final/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main terminal portfolio component
│   └── globals.css         # Global styles and animations
├── components/
│   └── terminal-output.tsx # Terminal output animation component
├── public/
│   ├── *.png              # Project images and logos
│   └── software-developer-headshot.png
├── README.md
└── package.json
\`\`\`

## Responsive Design

- **Desktop (1024px+)**: Side-by-side layout with ID card (25%) and terminal (75%)
- **Mobile (<768px)**: Terminal-only view, ID card hidden for better mobile experience
- **Touch Optimized**: Enhanced touch interactions for mobile devices

## Customization

### Updating Personal Information

1. **Profile Information**: Edit the command outputs in `app/page.tsx`
2. **Profile Image**: Replace `public/software-developer-headshot.png`
3. **Project Images**: Update images in the `public/` directory
4. **Contact Details**: Modify the contact command output
5. **Social Links**: Update the website-links command with your profiles

### Styling

- **Colors**: Modify CSS variables in `app/globals.css`
- **Fonts**: Update font imports in `app/layout.tsx`
- **Animations**: Customize animations in `app/globals.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Font Loading**: Optimized Google Fonts loading

## Deployment

This project can be deployed on various platforms:

### Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Upload the 'out' folder to Netlify
\`\`\`

### Other Platforms
Build the project and deploy the generated files from the build output.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please contact through the terminal interface using the `contact` command or visit the social links via the `website-links` command.
