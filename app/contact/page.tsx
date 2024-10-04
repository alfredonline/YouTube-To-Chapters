import React from "react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Header from "@/components/common/Header";
import { Mail, Twitter, Linkedin, Trash2 } from "lucide-react";
import Link from "next/link";

const ContactItem = ({
  icon,
  title,
  content,
  href
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  href: string;
}) => {
  return (
    <div className="flex items-start space-x-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors p-4">
      <div>
        <Link href={href} className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white mt-2">
          {React.createElement(icon, {
            className: "w-5 h-5",
          })}
        </Link>
        <h3 className="font-semibold text-lg mb-2 mt-2">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
        
      </div>
    </div>
  );
};

const page = () => {
  return (
    <MaxWidthWrapper className="flex flex-col gap-8 py-12 min-h-screen">
      <Header text="Contact Us" />
      <div className="max-w-2xl mx-auto w-full">
        <p className="text-xl text-center mb-8">
          Have questions? We are here to help!
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <ContactItem
            icon={Mail}
            title="General Inquiries"
            content="For any questions or support, please email us."
            href="mailto:hello@alfiewebdev.com"
          />

          <ContactItem
            icon={Twitter}
            title="Follow on X"
            content="Stay updated with our latest news and announcements"
            href="https://x.com/alfiewebdev"
          />

          <ContactItem
            icon={Linkedin}
            title="Connect on LinkedIn"
            content="Connect with me professionally on LinkedIn"
            href="https://www.linkedin.com/in/alfie-fort-39ba19264/"
          />

          <ContactItem
            icon={Trash2}
            title="Account Deletion"
            content="To delete your account, please email us."
            href="mailto:hello@alfiewebdev.com"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
