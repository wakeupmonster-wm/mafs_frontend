import {
  Lock,
  Eye,
  UserCheck,
  Database,
  Globe,
  Mail,
  Info,
  FileText,
  BookOpen,
} from "lucide-react";

export const privacyContents = [
  {
    id: "info-collect",
    icon: Database,
    title: "1. What information do we collect?",
    content: [
      {
        text: `The kind of Personal Information that we collect from you will depend on how you use the App. The Privacy Act 1998 (Cth) (Privacy Act) defines types of information, including Personal Information and Sensitive Information.`,
      },
      {
        text: `<b>Personal Information</b> means information or an opinion about an identified individual or an individual who is reasonably identifiable:`,
      },
      {
        list: true,
        listType: "alpha",
        items: [
          "whether the information or opinion is true or not; and",
          "whether the information or opinion is recorded in a material form or not.",
        ],
      },
      {
        text: `If the information does not disclose your identity or enable your identity to be ascertained, it will in most cases not be classified as "Personal Information" and will not be subject to this privacy policy.`,
      },
      {
        text: `<b>Sensitive Information</b> is defined in the Privacy Act as including information or opinion about such things as an individual's racial or ethnic origin, political opinions, membership of a political association, religious or philosophical beliefs, membership of a trade union or other professional body, criminal record or health information.`,
      },
      {
        text: `The Information which we collect and hold about you may include the following categories:`,
      },
      {
        subtitle: `Personal Information`,
        text: `We collect the following Personal Information:`,
      },
      {
        list: true,
        listType: "disc",
        items: [
          "Name",
          "Date of birth",
          "Email address",
          "Phone number",
          "Login credentials",
          "Gender",
          "Profile information for filtering purposes",
        ],
      },
      {
        text: `Optional information such as religion and relationship preferences is not required. If you choose to provide this sensitive information, you are consenting to its collection, use and disclosure in accordance with this Privacy Policy.`,
      },
      {
        subtitle: `ID Verification`,
        text: `By completing ID verification, you consent to us using and storing information that includes uploading a photo. We only use this information for confirming your identity and preventing unauthorised accounts.`,
      },
      {
        text: `Your legal name will not be shown publicly and is only required for ID verification purposes, unless you choose to use this as your display name/username. You may choose a different display name/username instead for your public profile.`,
      },
      {
        subtitle: `Payment Information`,
        text: `We will not store or process any card or payment details within our system. All payments will be handled securely by third-party providers, specifically Apple App Store and Google Play.`,
      },
      {
        text: `Our system will only retain basic transaction information such as transaction ID, amount, date and time, and subscription status. This is needed for managing entitlements, subscription renewals and refunds. No card numbers or sensitive payment details will ever enter our servers.`,
      },
      {
        subtitle: `Usage Data`,
        text: `This includes information such as when users log in, which screens or features they interact with, swiping behaviour, match activity and overall engagement patterns.`,
      },
      {
        text: `This type of data helps us improve the user experience, identify usability issues and detect bugs. We do not collect the content of private chats for analytics. Only technical delivery logs are kept for debugging.`,
      },
      {
        subtitle: `<i><b>Technical Data</b></i>`,
        text: `<i>We will collect technical information automatically through 3rd party tools.</i>`,
      },
      {
        text: `<i>Technical information collected includes the user's device model, operating system version, app version, IP address for session security, crash logs and diagnostic information.</i>`,
      },
      {
        text: `<i>This information is used only for security, error detection and performance improvements. It is not shared for marketing without explicit user consent.</i>`,
      },
      {
        text: `<i>Users can manage preferences via their device settings.</i>`,
      },
      {
        subtitle: `Cookies (Landing Page / Website Only)`,
        text: `Cookies will be used on the website only, not within the mobile app.`,
      },
      {
        text: `The landing page will use essential cookies required for basic site functionality.`,
      },
      {
        subtitle: `Marketing Preferences`,
        text: `We will include a simple opt-in and opt-out system for marketing communications. Users will be able to unsubscribe or update their preferences either through their account settings or directly through email links.`,
      },
      {
        text: `Opt-out requests can be processed within three business days. If a user opts out, we only retain the minimum information needed to comply with the request, for example their email and opt-out flag.`,
      },
      {
        subtitle: `<i><b>Contacts List</b></i>`,
        text: `<i>Where a user chooses to upload their contacts list for the purpose of blocking a contact from seeing them in the app, we will only collect that data where the user actively uses this function and solely for that purpose. This information will not be used for any other purpose or shared with any third party.</i>`,
      },
      {
        text: `<i>Imported contact information is stored in a securely hashed format and is used solely for preventing visibility between blocked users.</i>`,
      },
      {
        subtitle: `<b>Giveaways/Promotions</b>`,
        text: `<i>If you are the recipient of any rewards or giveaways within the app, we will collect and store data related to that giveaway for auditing purposes, i.e. name, prize, date it was awarded and to what email address it was sent to.</i>`,
      },
      {
        text: `<i>This information is stored securely in password-protected spreadsheets accessible only to authorised staff and retained for 7 years for auditing purposes.</i>`,
      },
    ],
  },
  {
    id: "how-collect",
    icon: Eye,
    title: "2. How we collect your Personal Information?",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "We may collect Personal Information from you whenever you input such information into the App, related app or provide it to Us in any other way.",
          "We may also collect cookies from your computer which enable us to tell when you use the Website and also to help customise your Website experience. As a general rule, however, it is not possible to identify you personally from our use of cookies.",
          "Where reasonable and practicable we collect your Personal Information from you only. However, sometimes we may be given information from a third party, in cases like this we will take steps to make you aware of the information that was provided by a third party.",
        ],
      },
    ],
  },
  {
    id: "purpose-collection",
    icon: Globe,
    title: "3. Purpose of collection",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "We collect Personal Information to provide you with the best service experience possible on the App and keep in touch with you about developments.",
          "We customarily only disclose Personal Information to our service providers who assist us in operating the App. Your Personal Information may also be exposed from time to time to maintenance and support personnel acting in the normal course of their duties.",
          "All service providers and third parties who receive access to your Personal Information are bound by written agreements requiring compliance with the Privacy Act 1988 (Cth) and Australian Privacy Principles. These agreements specify security standards, confidentiality obligations, permitted data uses, and breach notification requirements to ensure your information is protected to the same standard we apply.",
          "By using our App, you consent to the receipt of direct marketing material. We will only use your Personal Information for this purpose if we have collected such information direct from you, and if it is material of a type which you would reasonably expect to receive from use. We do not use sensitive Personal Information in direct marketing activity. Our direct marketing material will include a simple means by which you can request not to receive further communications of this nature, such as an unsubscribe button link.",
        ],
      },
    ],
  },
  {
    id: "security-access",
    icon: Lock,
    title: "4. Security, Access and correction",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          {
            text: "We store your Personal Information in a way that reasonably protects it from unauthorised access, misuse, modification or disclosure. When we no longer require your Personal Information for the purpose for which we obtained in, we will take reasonable steps to destroy and anonymise or de-identify it. Most of the Personal Information that is stored in our client files and records will be kept for a maximum of seven (7) years or for as long as legally necessary, to fulfill our legal record keeping obligations.",
            subList: {
              listType: "roman",
              items: [
                "The app is built with security measures to prevent people from taking screenshots of your profile. However, by using the app you acknowledge and accept that people may still access your photos through other means.",
              ],
            },
          },
          {
            text: "The Australian Privacy Principles:",
            subList: {
              listType: "roman",
              items: [
                "permit you to obtain access to the Personal Information we hold about you in certain circumstances (Australian Privacy Principle 12); and",
                "allow you to correct inaccurate Personal Information subject to certain exceptions (Australian Privacy Principle 13).",
              ],
            },
          },
          {
            text: "You may also request the deletion of your personal information by contacting us using the details below. We will take reasonable steps to delete your information from our systems, except where we are required to retain certain records to comply with our legal obligations.",
            subList: {
              listType: "roman",
              items: [
                "Note that we can only delete data from our own systems. If you wish to delete data held by third-party service providers (such as Apple or Google), you will need to contact them directly through their respective privacy request processes.",
              ],
            },
          },
          {
            text: "Where you would like to obtain such access, please contact us in writing on the contact details set out at the bottom of this privacy policy.",
          },
        ],
      },
    ],
  },
  {
    id: "third-party",
    icon: UserCheck,
    title: "5. Third Party Links",
    content: [
      {
        text: "We use third party providers for some services, including, but not limited to; cloud storage, processing payments for in-app purchases and subscriptions, and user authentication on login/sign up etc.",
      },
      {
        text: "We take reasonable steps to ensure all providers comply with the Privacy Act and apply security measures consistent with this policy.",
      },
    ],
  },
  {
    id: "complaint-procedure",
    icon: Info,
    title: "6. Complaint procedure",
    content: [
      {
        text: "If you have a complaint concerning the manner in which we maintain the privacy of your Personal Information, please contact us as on the contact details set out at the bottom of this policy. All complaints will be considered by The Privacy Officer and we may seek further information from you to clarify your concerns. If we agree that your complaint is well founded, we will, in consultation with you, take appropriate steps to rectify the problem. If you remain dissatisfied with the outcome, you may refer the matter to the Office of the Australian Information Commissioner.",
      },
    ],
  },
  {
    id: "doc-timeline",
    icon: FileText,
    title: "7. Documentation and Response Timeline",
    content: [
      {
        text: "We will acknowledge receipt of your complaint within 1 business day and provide you with a reference number. We will investigate your complaint and maintain detailed records of all communications and findings. We aim to resolve all privacy complaints within 7 business days. If additional time is required, we will notify you in writing. All complaint documentation will be retained for 12 months following resolution. If the matter requires escalation, our Privacy Officer will personally review your case within 1 business days of the escalation request.",
      },
    ],
  },
  {
    id: "contact-privacy",
    icon: Mail,
    title: "8. How to contact us about privacy?",
    content: [
      {
        text: "If you have any queries, or if you seek access to your Personal Information, or if you have a complaint about our privacy practices, you can contact us via email at: info@keenasmustard.com.au (please mark privacy queries as 'Privacy Request' in the subject line).",
      },
    ],
  },
  {
    id: "external-review",
    icon: BookOpen,
    title: "9. External Review Rights",
    content: [
      {
        text: "If you are dissatisfied with our response to your complaint, you have the right to lodge a complaint with the Office of the Australian Information Commissioner (OAIC). The OAIC can be contacted at 1300 363 992 or via www.oaic.gov.au. We will provide you with information about your external review rights in our final response to your complaint.",
      },
    ],
  },
];
