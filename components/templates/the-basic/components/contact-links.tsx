// import GitHub from "@/components/icons/github";
// import LinkedIn from "@/components/icons/linkedin";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function ContactLinks() {
  return (
    <div className="flex space-x-4">
      <a
        href="mailto:your.email@example.com"
        aria-label="Email"
        className="text-slate-600 hover:text-primary transition-colors"
      >
        <Mail size={24} />
      </a>
      <a
        href="tel:+1234567890"
        aria-label="Phone"
        className="text-slate-600 hover:text-primary transition-colors"
      >
        <Phone size={24} />
      </a>
      <a
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-slate-600 hover:text-primary transition-colors"
      >
        <Linkedin size={24} />
      </a>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-slate-600 hover:text-primary transition-colors"
      >
        <Github size={24} />
      </a>
    </div>
  );
}
