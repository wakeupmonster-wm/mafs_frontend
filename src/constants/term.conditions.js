import {
  Activity,
  AlertTriangle,
  Ban,
  CreditCard,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
  Globe,
  Database,
} from "lucide-react";

export const termsContent = [
  {
    id: "about-application",
    icon: FileText,
    title: "1. About the Application",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "Welcome to <b>Keen As Mustard</b> dating application (App).",
          "The Application is operated by Match At First Swipe Pty Ltd. Access to and use of the App, or any of its associated Services, is provided by Match At First Swipe Pty Ltd. Please read these terms and conditions (<b>Terms</b>) carefully. By using, browsing and/or reading the App, this signifies that you have read, understood and agree to be bound by the Terms. If you do not agree with the Terms, you must cease usage of the Application, or any of Services, immediately.",
          "Match At First Swipe Pty Ltd operating as Keen As Mustard reserves the right to review and change any of the Terms by updating this page at its sole discretion. When Match At First Swipe Pty Ltd operating as Keen As Mustard updates the Terms, it will use reasonable endeavours to provide you with notice of updates to the Terms. Any changes to the Terms take immediate effect from the date of their publication. Before you continue, we recommend you keep a copy of the Terms for your records.",
        ],
      },
    ],
  },
  {
    id: "acceptance-terms",
    icon: UserCheck,
    title: "2. Acceptance of the Terms",
    content: [
      {
        text: "You accept the Terms by remaining on the App. You may also accept the Terms by clicking to accept or agree to the Terms where this option is made available to you by <b>Keen As Mustard operated by Match At First Swipe Pty Ltd</b> in the user interface <b>(referred to as Keen As Mustard in this document)</b>.",
      },
    ],
  },
  {
    id: "registration",
    icon: Scale,
    title: "3. Registration to use the App Services",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "In order to access the App Services, you must first register as a user of the App. As part of the registration process, or as part of your continued use of the App Services, you may be required to provide personal information about yourself (such as identification or contact details), including but not limited to: Name, Date of Birth, Email, and/or phone number.",
          "You warrant that any information you give to Keen As Mustard in the course of completing the registration process will always be accurate, correct and up to date.",
          "Once you have completed the registration process, you will be a registered member of the App (<b>Member</b>) and agree to be bound by the Terms. As a Member you will be granted immediate access to the App Services.",
          {
            text: "You may not use the App Services and may not accept the Terms if:",
            subList: {
              listType: "roman",
              items: [
                "you are not of legal age to form a binding contract with Keen As Mustard; or",
                "you are a person barred from receiving the App Services under the laws of Australia or other countries including the country in which you are resident or from which you use the App Services.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "obligations",
    icon: Activity,
    title: "4. Your obligations as a Member",
    content: [
      {
        text: "As a Member, you agree to comply with the following: You will use the App Services only for purposes that are permitted by:",
      },
      {
        list: true,
        listType: "alpha",
        items: [
          "any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions;",
          "you have the sole responsibility for protecting the confidentiality of your password and/or email address. Use of your password by any other person may result in the immediate cancellation of the App Services;",
          "any use of your registration information by any other person, or third parties, is strictly prohibited. You agree to immediately notify Keen As Mustard of any unauthorised use of your password or email address or any breach of security of which you have become aware;",
          "access and use of the App is limited, non-transferable and allows for the sole use of the App by you for the purposes of Keen As Mustard providing the App Services;",
          "you will not use the App Services or Website for any illegal and/or unauthorised use which includes collecting email addresses of Members by electronic or other means for the purpose of sending unsolicited email or unauthorised framing of or linking to the App.",
          "you agree that commercial advertisements, affiliate links, and other forms of solicitation may be removed from the App without notice and may result in termination of the App Services. Appropriate legal action will be taken by Keen As Mustard for any illegal or unauthorised use of the App.",
          "you acknowledge and agree that any automated use of the App or its App Services is prohibited.",
          "You must be at least 18 years of age to use the App.",
          "Members must not upload any illegal or defamatory information or content. Breaching this requirement constitutes a breach of the app and community standards.",
          "Users acknowledge that <b>Keen As Mustard</b> is not responsible for any meet-ups or interactions that occur outside the app. You are solely responsible for taking necessary precautions when meeting other users. <b>Keen As Mustard</b> is not liable for any offline interaction and provides no warranty regarding the conduct or actions of any user.",
          "you will not attempt to reverse engineer, decompile, or disassemble any part of the App Services, or attempt to derive the source code or underlying ideas or algorithms of any part of the App Services.",
        ],
      },
      {
        text: "<b>Keen As Mustard</b> may suspend, restrict or terminate your account if your conduct breaches these terms.",
      },
    ],
  },
  {
    id: "subscriptions",
    icon: CreditCard,
    title: "5. Subscription Tiers and Access Levels",
    content: [
      {
        text: "<u>Free Membership</u><br/><br/>Upon registration, you will automatically receive a Free Membership which grants you access to basic features of the App, including: the ability to create and maintain a user profile; a limited number of swipes per day (as determined by Match At First Swipe Pty Ltd from time to time); the ability to match with other users who have also swiped positively on your profile; basic messaging functionality with your matches; and limited access to profile visibility settings. Free Membership does not include access to premium features, or member offers and discounts. <b>Keen As Mustard</b> reserves the right to modify the features available under Free Membership at any time without prior notice.",
      },
      {
        text: "<u>Paid Subscription</u><br/><br/>You may upgrade to a Paid Subscription at any time by selecting a subscription plan through the App and completing the payment process. Paid Subscription includes all Free Membership features plus additional benefits, including but not limited to: unlimited daily swipes; the ability to see who has liked your profile before swiping; boost profile visibility exposure; unlimited rewinds to reconsider previous swipes; access to exclusive member offers and discounts from partner businesses; and ad-free experience within the App.<br/><br/>Subscription fees are charged in advance on a recurring basis (monthly, or quarterly, depending on your selected plan) and are non-refundable except as required by law. Your Paid Subscription will automatically renew at the end of each billing cycle unless you cancel your subscription before your next billing date. You may cancel your Paid Subscription at any time through your account settings. <u>Upon cancellation, you will retain access to Paid Subscription features until the end of your current billing period, after which your account will revert to Free Membership.</u> <b>Keen As Mustard</b> reserves the right to modify subscription pricing, features, and benefits at any time. Any changes to your existing subscription will take effect upon your next renewal date.",
      },
      {
        text: "<u>Payment Terms for Subscriptions</u><br/><br/>All subscription fees must be paid through the Payment Gateway Provider specified in the App. You authorise <b>Match At First Swipe Pty Ltd operating as Keen As Mustard</b> to charge your nominated payment method for all subscription fees on a recurring basis. If payment cannot be processed for any reason, Keen As Mustard may suspend or downgrade your account to Free Membership until payment is successfully completed. <u>All prices are displayed in Australian dollars and include GST where applicable.</u>",
      },
    ],
  },
  {
    id: "no-guarantee",
    icon: ShieldCheck,
    title: "6. No Guarantee of Matches or Relationships",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          {
            text: 'You acknowledge and agree that <b>"Keen As Mustard"</b> makes no guarantee, warranty, representation, or promise that you will:',
            subList: {
              listType: "disc",
              items: [
                "find a match, romantic partner, or relationship through use of the App;",
                "achieve any particular outcome or result from using the App;",
                "meet compatible individuals or form successful connections; or",
                "experience any specific level of success in dating or relationships.",
              ],
            },
          },
          "<b>Keen As Mustard</b> makes no representations or warranties regarding the quality, suitability, compatibility, or intentions of other users on the App.",
          "Your success in finding matches or forming relationships depends on numerous factors outside the control of <b>Keen As Mustard</b>, including but not limited to your profile content, communication skills, personal preferences, and the actions of other users.",
          "<b>Keen As Mustard</b> shall not be liable for any disappointment, emotional distress, or other consequences arising from your inability to find matches or form relationships through the App.",
        ],
      },
    ],
  },
  {
    id: "purchase-terms",
    icon: Database,
    title: "7. Purchase Terms",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "In using the App Services to purchase a subscription or additional features, you will agree to the payment of the purchase price listed for the item/s selected.",
          "Payment of the Purchase Price may be made the Payment Gateway Provider. In using the App Services, you warrant that you have familiarised yourself with, and agree to be bound by, the applicable Terms and Conditions of Use, Privacy Policy and other relevant legal documentation provided by the Payment Gateway Providers.",
          "Following payment of the Purchase Price being confirmed by Keen As Mustard, you will be issued with a receipt to confirm that the payment has been received and Keen As Mustard may record your purchase details for future use.",
        ],
      },
    ],
  },
  {
    id: " intellectual-property",
    icon: Globe,
    title: "8. Copyright and Intellectual Property",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "The Website, the App Services and all of the related products of Keen As Mustard are subject to copyright. The material on the App is protected by copyright under the laws of Australia and through international treaties. Unless otherwise indicated, all rights (including copyright) in the site content and compilation of the website and App (including text, graphics, logos, button icons, video images, audio clips and software) (<b>Content</b>) are owned or controlled for these purposes, and are reserved by Keen As Mustard or its contributors.",
          {
            text: "Keen As Mustard retains all rights, title and interest in and to the App and all related content. Nothing you do on or in relation to the App will transfer to you:",
            subList: {
              listType: "alpha",
              items: [
                "the business name, trading name, domain name, trademark, industrial design, patent, registered design or copyright of Keen As Mustard; or",
                "the right to use or exploit a business name, trading name, domain name, trade mark or industrial design; or",
                "a system or process that is the subject of a patent, registered design or copyright (or an adaptation or modification of such a system or process).",
              ],
            },
          },
          "You may not, without the prior written permission of Keen As Mustard and the permission of any other relevant rights owners: broadcast, republish, up-load to a third party, transmit, post, distribute, show or play in public, adapt or change in any way the Content or third party content for any purpose. This prohibition does not extend to materials on the Website, which are freely available for re-use or are in the public domain.",
          "You agree to promptly notify <b>info@keenasmustard.com.au</b> of any actual or suspected infringement of Keen As Mustard's intellectual property rights that comes to your attention. In the event of any unauthorised use of Keen As Mustard's intellectual property, we reserve the right to seek all available legal and equitable remedies, including injunctive relief.",
        ],
      },
    ],
  },
  {
    id: "privacy",
    icon: Ban,
    title: "9. Privacy",
    content: [
      {
        text: "Keen As Mustard takes your privacy seriously and any information provided through your use of the Website and/or the App Services are subject to Keen As Mustard's Privacy Policy, which is available on the App and Website.",
      },
    ],
  },
  {
    id: "general-disclaimer",
    icon: AlertTriangle,
    title: "10. General Disclaimer",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "You acknowledge that Keen As Mustard does not make any terms, guarantees, warranties, representations or conditions whatsoever regarding the Services other than provided for pursuant to these Terms.",
          "Keen As Mustard will make every effort to ensure services are accurately depicted on the Website and in the App.",
          "Nothing in these Terms limits or excludes any guarantees, warranties, representations or conditions implied or imposed by law, including the Australian Consumer Law (or any liability under them) which by law may not be limited or excluded.",
          {
            text: "Subject to this clause, and to the extent permitted by law:",
            subList: {
              listType: "roman",
              items: [
                "all terms, guarantees, warranties, representations or conditions which are not expressly stated in these Terms are excluded; and",
                "Keen As Mustard will not be liable for any special, indirect or consequential loss or damage (unless such loss or damage is reasonably foreseeable resulting from our failure to meet an applicable Consumer Guarantee), loss of profit or opportunity, or damage to goodwill arising out of or in connection with the App Services or these Terms (including as a result of not being able to use the App Services or the late supply of the App Services), whether at common law, under contract, tort (including negligence), in equity, pursuant to statute or otherwise..",
              ],
            },
          },
          {
            text: `
            Use of the Website, the App Services, and any of the services of Keen As Mustard, is at your own risk. Everything on the Website, the App Services, and the services of Keen As Mustard, are provided to you on an "as is" and "as available" basis, without warranty or condition of any kind. None of the affiliates, directors, officers, employees, agents, contributors, third party content providers or licensors of Keen As Mustard make any express or implied representation or warranty about its Content or App Services (including the products or App Services of Keen As Mustard) referred to on the Website. This includes (but is not restricted to) loss or damage you might suffer as a result of any of the following:`,
            subList: {
              listType: "roman",
              items: [
                "failure of performance, error, omission, interruption, deletion, defect, failure to correct defects, delay in operation or transmission, computer virus or other harmful component, loss of data, communication line failure, unlawful third-party conduct, or theft, destruction, alteration or unauthorised access to records;",
                "the accuracy, suitability or currency of any information on the App, or any of its Content related products (including third party material and advertisements on the Website);",
                "costs incurred as a result of you using the Website, the App Services;",
                "the Content or operation in respect to links which are provided for the User's convenience;",
                "any failure to complete a transaction, or any loss arising from e-commerce transacted on the App; or",
                "any defamatory, threatening, offensive or unlawful conduct of third parties or publication of any materials relating to or constituting such conduct.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "limitation-liability",
    icon: Activity,
    title: "11. Limitation of Liability",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "Keen As Mustard's total liability arising out of or in connection with the App Services or these Terms, however arising, including under contract, tort (including negligence), in equity, under statute or otherwise, will not exceed the most recent Purchase Price paid by you under these Terms or where you have not paid the Purchase Price, then the total liability of Keen As Mustard is the resupply of information or App Services to you.",
          "You expressly understand and agree that Keen As Mustard, its affiliates, employees, agents, contributors, third party content providers and licensors shall not be liable to you for any direct, indirect, incidental, special consequential or exemplary damages which may be incurred by you, however caused and under any theory of liability. This shall include, but is not limited to, any loss of profit (whether incurred directly or indirectly), any loss of goodwill or business reputation and any other intangible loss.",
          "Keen As Mustard is not responsible or liable in any manner for any site content (including the Content and Third Party Content) posted on the Website or in connection with the App Services, whether posted or caused by users of the website of Keen As Mustard, by third parties or by any of the App Services offered by Keen As Mustard."
        ]
      }
    ]
  },
  {
    id: "termination-contract",
    icon: Ban,
    title: "12. Termination of Contract",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          "The Terms will continue to apply until terminated by either you or by Keen As Mustard as set out below.",
          {
            text: "If you want to terminate the Terms, you may do so by:",
            subList: {
              listType: "roman",
              items: [
                "closing your accounts for all of the App Services which you use, where Keen As Mustard has made this option available to you."
              ]
            }
          },
          {
            text: "Keen As Mustard may at any time, terminate the Terms with you if:",
            subList: {
              listType: "roman",
              items: [
                "you have breached any provision of the Terms or intend to breach any provision;",
                "Keen As Mustard is required to do so by law;",
                "a third party that offers the app services has terminated its relationship with Keen As Mustard;",
                "Keen As Mustard is transitioning to no longer providing the App Services to Users in the country in which you are resident or from which you use the service; or",
                "the provision of the App Services to you by Keen As Mustard is, in the opinion of Keen As Mustard, no longer commercially viable."
              ]
            }
          },
          "Subject to local applicable laws, Keen As Mustard reserves the right to discontinue or cancel your membership to the App at any time and may suspend or deny, in its sole discretion, your access to all or any portion of the Website or the App Services without notice if you breach any provision of the Terms or any applicable law or if your conduct impacts Keen As Mustard's name or reputation or violates the rights of those of another party.",
          "When the Terms come to an end, all of the legal rights, obligations and liabilities that you and Keen As Mustard have benefited from, been subject to (or which have accrued over time whilst the Terms have been in force) or which are expressed to continue indefinitely, shall be unaffected by this cessation, and the provisions of this clause shall continue to apply to such rights, obligations and liabilities indefinitely."
        ]
      }
    ]
  },
  {
    id: "indemnity",
    icon: ShieldCheck,
    title: "13. Indemnity",
    content: [
      {
        list: true,
        listType: "alpha",
        items: [
          {
            text: "You agree to indemnify Keen As Mustard, its affiliates, employees, agents, contributors, third party content providers and licensors from and against:",
            subList: {
              listType: "roman",
              items: [
                "all actions, suits, claims, demands, liabilities, costs, expenses, loss and damage (including legal fees on a full indemnity basis) incurred, suffered or arising out of or in connection with any Content you post through the App;",
                "any direct or indirect consequences of you accessing, using or transacting on the Website or attempts to do so and any breach by you or your agents of these Terms; and/or",
                "any breach of the Terms."
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "dispute-resolution",
    icon: Scale,
    title: "14. Dispute Resolution",
    content: [
      {
        subtitle: "14.1. Compulsory",
        text: "If a dispute arises out of or relates to the Terms, either party may not commence any Tribunal or Court proceedings in relation to the dispute, unless the following clauses have been complied with (except where urgent interlocutory relief is sought)."
      },
      {
        subtitle: "14.2. Notice",
        text: "A party to the Terms claiming a dispute (<b>Dispute</b>) has arisen under the Terms, must give written notice to the other party detailing the nature of the dispute, the desired outcome and the action required to settle the Dispute."
      },
      {
        subtitle: "14.3. Resolution",
        text: "On receipt of that notice (<b>Notice</b>) by that other party, the parties to the Terms (<b>Parties</b>) must:"
      },
      {
        list: true,
        listType: "roman",
        items: [
          "Within 28 days of the Notice endeavour in good faith to resolve the Dispute expeditiously by negotiation or such other means upon which they may mutually agree;",
          "If for any reason whatsoever, 28 days after the date of the Notice, the Dispute has not been resolved, the Parties must either agree upon selection of a mediator or request that an appropriate mediator be appointed by the President of the Law Society of New South Wales or his or her nominee;",
          "The Parties are equally liable for the fees and reasonable expenses of a mediator and the cost of the venue of the mediation and without limiting the foregoing undertake to pay any amounts requested by the mediator as a pre-condition to the mediation commencing. The Parties must each pay their own costs associated with the mediation;",
          "The mediation will be held in Sydney, Australia."
        ]
      },
      {
        subtitle: "14.4. Confidential",
        text: "All communications concerning negotiations made by the Parties arising out of and in connection with this dispute resolution clause are confidential and to the extent possible, must be treated as \"without prejudice\" negotiations for the purpose of applicable laws of evidence."
      },
      {
        subtitle: "14.5. Termination of Mediation",
        text: "If 2 months have elapsed after the start of a mediation of the Dispute and the Dispute has not been resolved, either Party may ask the mediator to terminate the mediation and the mediator must do so."
      }
    ]
  },
  {
    id: "venue-jurisdiction",
    icon: Globe,
    title: "15. Venue and Jurisdiction",
    content: [
      {
        text: "The App Services offered by Keen As Mustard are intended to be used by residents of Australia. In the event of any dispute arising out of or in relation to the Website, you agree that the exclusive venue for resolving any dispute shall be in the courts of <b>New South Wales</b>, Australia."
      }
    ]
  },
  {
    id: "governing-law",
    icon: FileText,
    title: "16. Governing Law",
    content: [
      {
        text: "The Terms are governed by the laws of New South Wales, Australia. Any dispute, controversy, proceeding or claim of whatever nature arising out of or in any way relating to the Terms and the rights created hereby shall be governed, interpreted and construed by, under and pursuant to the laws of <b>New South Wales</b> Australia, without reference to conflict of law principles, notwithstanding mandatory rules. The validity of this governing law clause is not contested. The Terms shall be binding to the benefit of the parties hereto and their successors and assigns."
      }
    ]
  },
  {
    id: "severance",
    icon: Activity,
    title: "17. Severance",
    content: [
      {
        text: "If any part of these Terms is found to be void or unenforceable by a Court of competent jurisdiction, that part shall be severed and the rest of the Terms shall remain in force."
      }
    ]
  },
  {
    id: "giveaways",
    icon: Database,
    title: "18. Giveaways and Promotions",
    content: [
      {
        text: "From time to time, Keen As Mustard may offer giveaways, competitions, or promotional offers (<b>Promotions</b>) to Members through the App."
      },
      {
        list: true,
        listType: "alpha",
        items: [
          {
            text: "Unless otherwise specified, eligibility to participate in any Promotion is strictly limited to Members who:",
            subList: {
              listType: "roman",
              items: [
                "hold a current Premium Subscription",
                {
                  text: "have <b>matched</b> with at least one other user (at any subscription level)",
                  subList: {
                    listType: "roman",
                    items: [
                      "a Match means two accounts or people have mutually matched (swiped Keen) in good standing.",
                      "The app does not guarantee that any user will receive a match, as match outcomes depend on the independent actions and preferences of other users.",
                      "Failure to receive a match on any given day does not constitute discrimination, as match outcomes depend on user behaviour and preferences outside the app's control.",
                      "there is no additional fee for entry; entry is included in Premium membership provided you comply with the criteria and terms.",
                      "All giveaways are games of chance only. Winners are selected at random and no skill, strategy, or particular action will increase your likelihood of winning.",
                      "Each (premium) user is limited to winning a maximum of two (2) prizes in any calendar year (1 January to 31 December). If a user is selected as a winner for a third time in the same calendar year, an alternate winner will be re-drawn."
                    ]
                  }
                }
              ]
            }
          },
          "Keen As Mustard reserves the right to verify subscription status at any time and to disqualify any entrant who does not meet the eligibility requirements.",
          {
            text: "Prizes are non-transferable and cannot be exchanged for cash or other alternatives unless otherwise specified in the specific Promotion terms.",
            subList: {
              listType: "roman",
              items: [
                "Any additional third-party supplier terms (expiry dates. booking rules etc) apply."
              ]
            }
          },
          "Keen As Mustard reserves the right to cancel, modify, or suspend any Promotion at any time where it's required by law or reasonably necessary.",
          {
            text: `Users must not attempt to manipulate, game, or artificially influence match outcomes or eligibility. This includes but is not limited to:`,
            subList: {
              listType: "roman",
              items: [
                "Creating multiple accounts",
                "Coordinating matches",
                "using automated tools or scripts<br/><br/><span style='display:block; margin-left:-2rem;'>Any suspected manipulation may result in disqualification or account action.</span>"
              ]
            }
          },
          "Winners will be notified via the App and prizes will be delivered by email.",
          "Each Promotion may be governed by specific Promotion Terms displayed in the App (including entry periods, prize details, draw mechanics, and any permit). In the event of any inconsistency between these Terms and the specific Promotion Terms, the specific Promotion Terms will prevail to the extent of the inconsistency.",
          "Keen As Mustard may seek your consent to publish your name, state and/or feedback as a giveaway recipient.",
          "If a prize is not available or cannot be delivered in the state where the winner resides, Keen As Mustard will issue a gift card of equivalent value instead.",
          "Apple is not a sponsor of, nor involved in any way with the promotions and giveaways."
        ]
      }
    ]
  }
];
