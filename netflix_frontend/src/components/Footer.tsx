import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: Facebook,
      url: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: Instagram,
      url: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: Twitter,
      url: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Youtube,
      url: "https://youtube.com",
      label: "YouTube",
    },
  ];
  const footerLinks = [
    [
      { text: "Audio Description", url: "#" },
      { text: "Investor Relations", url: "#" },
      { text: "Legal Notices", url: "#" },
    ],
    [
      { text: "Help Centre", url: "#" },
      { text: "Jobs", url: "#" },
      { text: "Cookie Preferences", url: "#" },
    ],
    [
      { text: "Gift Cards", url: "#" },
      { text: "Terms of Use", url: "#" },
      { text: "Corporate Information", url: "#" },
    ],
    [
      { text: "Media Centre", url: "#" },
      { text: "Privacy", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  ];

  return (
    <footer className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-6 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label={`Visit our ${social.label} page`}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col space-y-3">
              {column.map((link) => (
                <a
                  key={link.text}
                  href={link.url}
                  className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}
        </div>
        <button className="mt-8 border border-gray-400 text-gray-400 px-4 py-2 text-sm hover:text-white hover:border-white transition-colors duration-300">
          Service Code
        </button>
      </div>
    </footer>
  );
};

export default Footer;
