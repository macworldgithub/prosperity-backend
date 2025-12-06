// import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { v4 as uuidv4 } from 'uuid';
// import * as nodemailer from 'nodemailer';
// import { OpenAI } from 'openai';
// import { EscalationRequestDto, QueryRequestDto } from './dto';
// import { CustomerService } from '../customer/customer.service';
// import { NumberService } from '../number/number.service';
// import { AddCustomerDto } from '../customer/dto/add-customer.dto';
// import { UserService } from '../user/user.service';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import { UpdateUserDto } from '../user/dto/update-user.dto';

// const KNOWLEDGE_BASE = `
// ## Safety Instructions and other initial content omitted for brevity, but the KB starts here:

// Bele/JUSTmobile Customer Service
// Knowledge Base for Chat AI
// (Customer-Facing Mobile Focus)
// Last Updated: October 7, 2025
// Purpose: This knowledge base empowers the Chat AI to provide efficient, empathetic
// customer support for Bele/JUSTmobile’s mobile services. It emphasizes customer-facing
// aspects such as plan selection, activation, billing, usage management, and troubleshooting,
// drawing from Bele’s GTM strategy for MVNO/MVNE expansion. Prioritize user-friendly
// responses: Start with empathy (e.g., “I’m sorry you’re experiencing this”), offer step-by-step
// guidance, and suggest upsells naturally (e.g., “Upgrading to Premium could prevent data
// throttling”). For account-specific issues, verify via backend API. Escalate unresolved queries to
// live agents. All prices in AUD; plans month-to-month, no lock-in. Focus on accessibility for all
// users, including those with special needs (e.g., NDIS integration).
// 1. General Customer-Facing Information
// Bele, through JUSTmobile, offers affordable, AI-powered mobile services as an MVNO,
// leveraging partnerships for reliable coverage. Our mission: Revolutionize everyday utility
// engagement with seamless mobile connectivity. Customer benefits include easy onboarding
// (few clicks), AI-managed support, and lifetime value through personalized recommendations.
// Target users: Individuals, families, businesses, and partners (e.g., IoT users, charity supporters
// like Flying Kiwi, tech clients via Prosperity Tech).
// ● Why Choose Bele/JUSTmobile?
// ○ Nationwide 4G/5G coverage via MNO partners (98% population; check app map
// for signal).
// ○ No excess data charges – throttled speeds post-allowance (1.5Mbps, suitable for
// email/browsing).
// ○ Free eSIM activation for instant setup; physical SIM delivery in 3-5 days ($5 fee
// waived for new users).
// ○ Sustainability: eSIM reduces waste; carbon offset add-on ($1/month).
// ● Account Management Basics:
// ○ Sign-Up/Activation: Via app/widget: Enter details, port number (if switching),
// scan ID for verification. eSIM QR in 2 mins; confirm via SMS. Porting takes 1-3
// business days (keep old SIM active).
// ○ Login Issues: Forgot PIN? Reset via email/SMS. Biometric not working? Clear
// app cache or reinstall.
// ○ Profile Updates: Change address/phone via app (instant); impacts
// billing/coverage checks.
// ○ Cancellation: No fees; notify via app/chat. Return devices within 14 days for
// refund (minus usage).
// ○ Multi-Line Management: Add family lines in app; share data (up to 200GB
// rollover).
// ● Billing and Payments:
// ○ Cycle: Monthly from activation date; view via app (PDF download/email).
// ○ Methods: Credit/debit card, PayPal, BPAY. Auto-pay discount: $2/month.
// ○ Disputes: Log in app (e.g., “Double charge?”); AI reviews in 24hrs, refund if valid
// (avg. 3 days).
// ○ Late Payments: 7-day grace; $5 fee post-grace. No service suspension for first
// offense; alerts via push.
// ○ Prorata: New activations billed pro-rata; changes mid-cycle effective next bill.
// ● Usage Monitoring:
// ○ Data Rollover: Unused rolls over (max 200GB); expires after 2 months.
// ○ International: Check roaming rates in app; auto-disable to avoid surprises.
// 2. Customer-Facing Mobile Products
// Focus on easy-to-use, scalable options for everyday mobile needs. All compatible with 5G
// devices.
// 2.1 SIM and eSIM Options
// ● eSIM (Recommended): Instant digital activation via app QR scan. Free for new users;
// supports dual-SIM (e.g., work/personal). Troubleshooting: If not activating, ensure device
// compatibility (app check); restart phone.
// ● Physical SIM: Triple-cut (nano/micro/standard); $10 delivery. Activation: Insert, app
// scan barcode. Lost SIM? Suspend via app, replacement $15 (express delivery $25).
// ● Multi-SIM: For tablets/smartwatches; $5/month add-on, shares data.
// 2.2 Plans and Add-Ons
// Plans designed for flexibility: Switch anytime via app (effective next cycle). All include unlimited
// national calls/texts, 5G access (where available), and basic international (30min calls/unlimited
// SMS to 20 countries).
// ● Personal Plans:
// ○ Starter ($25/month): 20GB data; ideal for light browsing/social. Throttle
// post-allowance. Promo: $5 off first month.
// ○ Everyday ($40/month): 60GB; streaming-friendly. Rollover up to 100GB.
// ○ Premium ($60/month): 150GB; unlimited HD streaming. Free VPN add-on.
// ○ Unlimited ($80/month): No cap (throttle after 300GB at 100Mbps). Family share
// for 4 lines.
// ● Family Plans: Base + $20/line (up to 5); shared data pool. Parental controls: App limits
// data/apps per line.
// ● Business Plans: Starter ($30/line, 40GB); Pro ($50/line, 100GB with priority support).
// Enterprise: Custom (e.g., API for CRM sync).
// ● Add-Ons (Bolt-Ons):
// ○ Extra Data: $10/20GB (valid 30 days).
// ○ International Pack: $15/month (unlimited to 50 countries).
// ○ Roaming Day Pass: $5/day (2GB, 20 countries).
// ○ Device Insurance: $10/month (covers loss/theft; $100 excess).
// ○ IoT Add-On: $5/device (1GB; for smart home gadgets).
// ● Switching Providers: Port-in bonus: $20 credit. Keep number; app tracks port status.
// 2.3 Promotions and Bundles
// ● New User Promo: Free first month on Everyday+ plans (ends Nov 1, 2025).
// ● Referral: $10 credit each for referrer/referee.
// ● Bundle Savings: SIM + device = 15% off plan for 6 months.
// ● Charity/Partner Bundles: E.g., Flying Kiwi ($35/50GB, 10% to charity); Prosperity Tech
// ($45/80GB, IT integration perks).
// 3. Customer-Facing Mobile Services
// Services optimized for self-service via AI app/widget, reducing wait times.
// 3.1 Activation and Onboarding
// ● Steps: Download app, select plan, enter details, verify ID (photo upload), activate
// eSIM/SIM. AI guides if stuck (e.g., “Camera not working? Use manual entry”).
// ● Porting Number: Enter old number/provider; AI estimates time (1-3 days). Track status
// in app.
// ● Issues: Activation failed? Check network (Wi-Fi needed for eSIM); retry or chat escalate.
// 3.2 Usage and Monitoring
// ● Data Management: App shows breakdown (e.g., app-specific usage); set limits/alerts.
// ● Calls/Texts: Unlimited domestic; international add-ons. Block numbers via app.
// ● Roaming: Auto-detect; enable packs in app. Data saver mode for abroad.
// ● Hotspot: Free on all plans; up to 10 devices. Troubleshooting: If not working, toggle
// airplane mode.
// 3.3 Billing and Account Services
// ● View/Pay Bill: App shows itemized (data, calls, add-ons); pay instantly.
// ● Auto-Pay Setup: Link card; $2 discount. Cancel anytime.
// ● Refunds/Credits: For overcharges, AI processes (e.g., “Prorate refund for early
// cancel”); 5-7 days to card.
// ● Plan Changes: Upgrade/downgrade via app; pro-rata charges.
// 3.4 Support Services
// ● AI-First Support: 24/7 chat for 80% issues; human handover if needed.
// ● Ticket System: Log via app (e.g., “Coverage drop”); status updates via push.
// ● Feedback: Post-resolution survey; improves AI.
// 4. Troubleshooting Guide
// Detailed, step-by-step for common mobile issues. Always ask for details (e.g., device model,
// location) before advising.
// 4.1 Connectivity Issues
// ● No Signal/Service:
// 1. Check coverage map in app.
// 2. Restart device; toggle airplane mode (30 secs).
// 3. Ensure SIM/eSIM active (app status).
// 4. If roaming, enable data roaming. Escalate if outage suspected (network check via
// AI).
// ● Slow Data/Speeds:
// 1. Test speed in app (expect 20-100Mbps 4G/5G).
// 2. If throttled, check usage (post-allowance 1.5Mbps); add data pack.
// 3. Clear cache; update OS/app. In crowded areas, suggest Wi-Fi offload.
// 4.2 Device and Activation Problems
// ● eSIM Not Activating:
// 1. Confirm device compatibility (app scan).
// 2. Re-download QR from email/app.
// 3. Wipe eSIM profile (settings > cellular > remove); retry. If fails, new QR via chat.
// ● SIM Not Recognized:
// 1. Reinsert SIM; clean contacts.
// 2. Test in another device. Replacement if faulty (free if <30 days).
// ● Biometric Login Fails:
// 1. Re-enroll fingerprint/face in device settings.
// 2. Use PIN fallback; reset via email if forgotten (security question).
// 4.3 Billing and Payment Errors
// ● Double Charge:
// 1. View bill breakdown in app.
// 2. Log dispute (upload proof); AI refunds if valid (48hrs).
// 3. Prevent: Enable auto-pay alerts.
// ● Payment Declined:
// 1. Check card details/expiry in app.
// 2. Try alternative method. If bank issue, advise contact bank.
// ● Unexpected Fees:
// 1. Review add-ons/roaming. Remove via app.
// 2. Promo not applied? Verify eligibility; manual credit if error.
// 4.4 App and Software Issues
// ● App Crashing/Freezing:
// 1. Update app (Google Play/App Store).
// 2. Clear cache/data (settings > apps > JUSTmobile).
// 3. Reinstall; login again. Report bug via feedback.
// ● Notifications Not Working:
// 1. Check app permissions (notifications enabled).
// 2. Toggle do-not-disturb. Test with manual alert.
// 4.5 Call/Text/Roaming Problems
// ● Dropped Calls:
// 1. Move to better coverage; use Wi-Fi calling if available.
// 2. Update device software. If persistent, SIM swap.
// ● Texts Not Sending:
// 1. Check signal; resend.
// 2. Verify number format (+61 for Australia). MMS needs data on.
// ● Roaming Not Working:
// 1. Enable roaming in settings/app.
// 2. Purchase pack if needed. Check country eligibility.
// 4.6 Advanced Troubleshooting
// ● Data Not Working: Toggle mobile data; reset network settings (device > general >
// reset).
// ● Hotspot Issues: Ensure plan allows; restart hotspot. Max speed matches plan.
// ● International Calls Fail: Add pack; dial +country code. Blocked? Unblock in app.
// ● Escalation Threshold: If steps fail 2x, transfer to agent (“I’ll connect you now”).
// 5. Escalation and Advanced Support
// ● When to Escalate: Complex issues (e.g., porting delays >3 days, fraud suspicion).
// ● Human Agent: Avg. wait 2 mins; available 8AM-8PM AEST. App chat handover
// seamless.
// ● Emergency: For outages, direct to status page; 000 for life-threatening (not
// Bele-related).
// ● Feedback Integration: Use query logs to refine AI; aim for <10% escalations.
// AI Response Guidelines: Be concise, empathetic, proactive. E.g., “Let’s fix that no-signal issue
// step-by-step.” Suggest related services (e.g., “Coverage low? Consider our booster add-on.”).
// Always end with “Is there anything else I can help with?”

// Q: Why is my first bill higher than my monthly plan price?
// A: Your first bill is a little different because it covers two periods. It includes a partial charge for the remainder of your first month (this is called a pro-rata charge) plus the full charge for the upcoming month in advance. After this, your bills will reflect your standard monthly plan price.
// Q: What does "pro-rata" mean?
// A: "Pro-rata" is just a simple way of saying we only charge you for the days you used our service in your first month. For example, if you join halfway through the month, we'll only bill you for that half of the month, not the full month.
// Q: When do I get my bill?
// A: We'll send your invoice to you on the 15th of each month. The payment will then be processed from your account a few days after you receive the invoice.
// Q: How do I get my bill?
// A:  We'll automatically send an invoice to your registered email address on the 15th of every month.
// Q: How do I pay my bill? Do I need to do anything?
// A: Your payments are handled automatically through the direct debit you set up when you joined. We’ll use the bank account or credit card details you provided, so no action is required from you.
// Q: What is your billing cycle?
// A: We bill in advance for the month ahead. Your monthly invoice is generated on the 15th, and it covers the period for the upcoming calendar month.

// Q: I've just received my bill. Can you help me understand it?
// A: Your bill is designed to give you a clear summary of your account and a detailed breakdown of your usage. The most important details, like the total amount and payment date, are right on the first page for you. The following pages provide a full, itemised list of every call, text, and data session from the billing period.

// Q: How much is my bill and when is it due?
// A: You can find this information on the top right of the first page. Look for the fields labelled "Amount Due", which will show a value like AUD$XX.XX, and "Payment Due", which shows the date the payment will be processed.

// Q: Do I need to pay this bill myself? The "Payment Slip" says I don't.
// A:  Because you have a direct debit set up with us, you don't need to do a thing! We show payment options like BPAY and Australia Post on the bill for reference, but your payment will be made automatically from your saved credit card or bank account on the due date.

// Q: How will the payment appear on my bank statement?
// A: When you see the direct debit on your bank or credit card statement, it will appear with the description "Telecommunications Payment Services".

// Q: What do the "Charges Summary" and "New Charges" mean?
// A: The "Charges Summary" on the right of the first page shows you how the total amount is calculated. It's made up of:
// • Mobile: This is your monthly plan fee plus any extra usage charges.
// • GST: This is the Goods and Services Tax on the total charge.
// These add up to your "Total Charges" (e.g., AUD$XX.XX), which is also shown as your "New Charges" and "Amount Due".

// Q: What is the "Mobile Access Fee" on page 3?
// A: The "Mobile Access Fee" is simply your standard monthly plan charge. It's the fee for having access to the JUSTmobile network for calls, texts, and data, as included in your plan. The bill shows the date range this fee covers.

// Q: Why are there so many pages showing calls, SMS, and data with a zero cost?
// A: We provide a fully itemised bill so you can see exactly how you're using your service. While your plan includes many things like standard calls and texts, we list every single one so you have a complete record. The zero cost shown next to them just confirms they were covered by your plan's included value.

// Q: I see a charge for SMS/MMS. I thought texts were included?
// A: Standard SMS (text messages) are included in your plan. However, MMS (messages with pictures or videos) can sometimes have a small charge, like AUD$XX.XX, depending on your plan. This is listed under the "Charges Summary" on your bill.

// Q: Where do I find my Account Number?
// A: Your Account Number is located on the top right of every page, and also on the Payment Slip at the bottom of page one. It will be a number like XXX.

// Q: What should I do if I'm having trouble paying my bill?
// A: If you're ever experiencing financial hardship, please get in touch with us. You can find out more at: https://justmobile.ai/financial-hardship/

// Q: I'm worried I can't pay my next bill. What should I do?
// A: The most important thing is to let us know as soon as you can. We understand that circumstances can change unexpectedly, and we're committed to working with you to find a solution. Please reach out to us to discuss your situation.
// Q: What is "financial hardship"?
// A: Financial hardship is a situation where you are unable to keep up with your bills and financial commitments due to unexpected events. This could be because of things like a change in employment, illness, a natural disaster, or a shift in your family circumstances.
// Q: How can I apply for financial hardship assistance?
// A: To start the process, you should contact us to discuss your situation. We have a dedicated Financial Hardship Application Form on our website which you can fill out. This helps us understand your circumstances so we can find the best way to support you.
// Q: What kind of help can JUSTmobile offer?
// A: We assess every situation on a case-by-case basis to find a solution that works for you. Depending on your circumstances, assistance could include options like creating a flexible payment arrangement, finding a more affordable plan, or temporarily postponing payments. Our main goal is to help you stay connected.
// Q: Will I need to provide personal documents or evidence?
// A: To properly assess your application, we may ask you to provide some information and relevant documents that support your situation.  This helps us understand your circumstances fully and ensures we can offer the right kind of assistance. All information you provide is handled confidentially in line with our privacy policy.
// Q: Is there a fee for applying for financial hardship assistance?
// A: No, there are absolutely no fees for applying for financial hardship assistance or for any payment arrangement we agree to.
// Q: What if I need more help or independent advice?
// A: If you'd like to speak with someone independent, you can contact the National Debt Helpline at 1800 007 007. They offer free, confidential financial counselling and can provide additional support and advice.
// Q: What happens after I submit my application?
// A: Once we receive your completed application and any necessary documents, our team will assess it. We will then get in touch with you to discuss the outcome and the next steps. We aim to let you know the outcome within 7 business days.

// Q: Where can I find my phone number and customer number?
// A: You can find both your phone number and your customer number in the welcome email we sent you right after you successfully connected to JUSTmobile.
// Q: How do I Change the Primary Account Holder Email
// A: You can change your primary account holders email in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Change the Primary Account Holder address
// A: You can change your primary account holders postal address in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Change the Authorised Account Holder Email
// A: You can change your authorised account holders email in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Change the Authorised Account Holder address
// A: You can change your authorised account holders postal address in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I View my invoices
// A: You can view your invoices in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Manage my Direct Debit
// A: You can manage your direct debit in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I View payment history
// A: You can find your full payment history in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I update my payment method?
// A: You can update your payment method in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: Can I get a new invoice sent?
// A: You can see any invoices previously sent to you in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: Where can I view my detailed usage?
// A: You can view your detailed usage in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: I cancelled my service, why have you invoiced me?
// A: Your final bill settles up the last remaining days of usage on your account. Here’s how it usually works:
// We bill in advance: Your regular monthly payments cover the month ahead.
// Final pro-rata charge: This final invoice simply covers the period between your last payment and the date your service was officially disconnected.
// Please be assured that once this is paid, your account will be fully closed, and you won't receive any further invoices from us. You can confirm the exact dates covered by looking at the "Billing Period" on the invoice itself.

// Q: What is pro-rata billing?
// A: "Pro-rata" sounds technical, but it's really just a simple and fair way of billing.
// It means we only charge you for the exact number of days your service is active within a billing period, instead of charging for the full month.
// For example, if your monthly plan costs AUD$30 and you join us halfway through the month, your first bill won't be for the full AUD$30. Instead, we'll charge you a "pro-rata" amount of around AUD$15 to cover the part of the month you were with us.
// You'll usually see this on your very first bill, or on your final bill if you decide to cancel. It's our way of making sure you only ever pay for what you use.

// Q: What happens if I use more data than my plan includes?
// A: To make sure you're never cut off unexpectedly, we automatically add an extra 2 gigabytes of data to your plan if you run out.
// If you notice you're frequently needing more data, it might be a good idea to upgrade your plan. I can help you with that—just ask to see our other mobile plans.

// Q: Can I switch from prepaid to postpaid (or vice versa)?
// A: All of our plans here at JUSTmobile are postpaid, which means your payments are conveniently handled automatically each month.

// Q: Where do I find my customer number with old provider?
// A: The best place to find your customer or account number is on a recent bill from your old provider. You can also check the welcome email they sent when you first signed up.
// If you can't spot it in your documents, a quick call to their customer support team is the easiest way to get it.

// Q: How long does porting take
// In most cases, your number will be active with us in under 3 hours.
// Sometimes, especially if the request is made on a weekend or a public holiday, it can take a little longer—up to 2 business days. This is a standard timeframe across all mobile providers in Australia, as it depends on your old provider releasing the number to us.
// We'll send you an SMS the moment the transfer is complete. You'll know it's worked when your old service stops working.

// Q: My port hasn’t gone through
// While most transfers are complete in under 3 hours, it can sometimes take up to 2 business days for your old provider to fully release the number. The most common reason for a delay is a simple mismatch in the details provided—like the account number or date of birth not quite matching what your old provider has on file.

// Q: Not working since porting
// The most common reason is that the number porting process is not yet complete. However, there could be other reasons. Ensure your account is active and not overdue my logging into the customer portal. Another issue could be known network outages. Check the website or Telstra Wholesale network to see if this is happening in your area.

// Q: Why is my mobile signal weak or not working?
// A: First, please try toggling Airplane Mode on and off, or restarting your phone, as this fixes most signal issues.
// If you're still having trouble, it could be due to your location. We use the Telstra Wholesale network, and things like being inside a large building or in a hilly area can affect the signal. You can always check your address on the official coverage map.

// Q: I forgot my login password – how do I reset it?
// A: Go to the login page on justmobile.ai and click the 'Forgot Password' link to start the reset process.
// Q: Can I add someone to my account?
// A: Yes, you can add an authorised user to your account by logging into your online customer portal.
// Q: How do I access my account online?
// A: Visit justmobile.ai and select the 'Login' button at the top of the page to access your account.
// Q: I need to change my address or email.
// A: You can update your personal address and email details by logging into your online customer portal.
// Q: Can I remove someone from my account?
// A: Yes, you can remove an authorised user from your account at any time via the customer portal.
// Q: How do I update my contact details?
// A: Log into your online customer portal to update your contact details, including your address and email.

// Q: What exactly is an eSIM?
// A: Think of an eSIM as a digital SIM card that's already built into your phone. It does everything a traditional plastic SIM card does, but you can download your JUSTmobile plan directly to your device without needing to pop anything in or out.

// Q: How do I get an eSIM with JUSTmobile?
// A: Getting connected with a JUSTmobile eSIM is super simple. Just select one of our plans online, and Bele will set you up and email you a QR code to scan and activate your service instantly.

// Q: How long does it take to activate an eSIM?
// A: It's incredibly fast! Once you have your QR code, you can be connected to the JUSTmobile network in just a few minutes. All you need is a stable Wi-Fi connection to get started.

// Q: How do I know if my phone is compatible with eSIM?
// A: Most newer smartphones are eSIM-ready. The easiest way to check is in your phone's settings under "Cellular" or "Mobile Data"—if you see an option like "Add eSIM" or "Add Cellular Plan," your device is compatible.

// Q: Will eSIM work on my phone?
// A: Check if you can see "Add eSIM" in your settings under 'Mobile'. If you can see that, you are all set.

// Q: What are the main benefits of using an eSIM?
// A: Using an eSIM makes life so much easier! Activation is almost instant, so there's no waiting for a plastic SIM to arrive in the mail. It's also fantastic for travellers who want to use a local SIM overseas while keeping their JUSTmobile number active on the same phone.

// Q: Can I have more than one number on my phone with an eSIM?
// A:Absolutely! Most eSIM-compatible phones let you use two numbers at once. This is perfect if you want to have both your work and personal numbers on a single device, or if you want to use a local data plan while travelling overseas.

// Q: Can I switch my physical SIM to an eSIM?
// A: Yes, you can! Just choose a plan, and select ‘transfer number’ and you SIM will turn into an eSIM as part of the porting process.

// Q: Why has my service been suspended?
// A:
// I can see why you'd be concerned about your service being suspended. This usually happens for one of two main reasons: an overdue bill or a breach of our fair use policy. The quickest way to find out exactly what's happened and get it sorted is for our team to check your account details. Please get in touch with us, and we can look into this for you right away.

// Q: Why was my number disconnected?
// A:Having your number disconnected is definitely a serious concern. This can happen if you've recently chosen to cancel your account or transfer your number to a different provider. It may also occur if an account has a significant overdue balance. Please contact our support team so we can look into the specifics for your account and advise on what steps can be taken.

// Q: I’m not happy with your service – who do I talk to?
// A: I'm genuinely sorry to hear that you're not happy, and we absolutely want to understand what's gone wrong. The best way for us to formally address your concerns is for you to lodge a complaint with our team. You can find all the details on how to do this, including our online form and contact number, on our Complaints Handling Policy page.

// Q: Can I get a refund?
// A: That's a fair question. We can process a refund in specific circumstances, such as if you've accidentally overpaid your bill or if there's been an incorrect charge on your account. However, we don't offer refunds for any unused portions of your service if you choose to cancel your plan or transfer your number away. If you believe you're eligible for a refund, please get in touch with our team so we can investigate it for you.

// Q: Where can I submit formal feedback?
// A:
// We really appreciate you taking the time to give us formal feedback—it's what helps us improve! The best way to make sure your comments are officially recorded and reviewed by the right people is to use our online complaints form. You can find it right here: https://justmobile.ai/complaints/

// Q: What actually is an eSIM, and how is it different from my normal SIM card?
// A: An eSIM is a digital SIM card that's already built into your phone, letting you download your plan instantly without needing a physical card.
// Q: What are the main benefits of using an eSIM? Why should I switch?
// A: The biggest benefits are speed and convenience; you can be connected in minutes and it's perfect for using two numbers on one phone.
// Q: Is this a 'real' mobile service? Will I get my own phone number?
// A: Yes, it's a full mobile service, and you can either bring your current Australian mobile number over to us or get a new one.

// Q: How do I know if my phone can even use an eSIM?
// A: Most new smartphones are compatible. To be sure, check your phone's settings under 'Mobile' or 'Cellular' for an 'Add eSIM' option.
// Q: What if my phone is locked to another provider like Telstra, Optus, or Vodafone?
// A: Your phone will need to be unlocked before you can use our service, so you'll need to contact your current provider and ask them to unlock it.
// Q: Can I use a JUSTmobile eSIM on my smartwatch or tablet?
// A: Our eSIM plans are only for one device currently, but will be adding that functionality soon.
// The Sign-Up and Activation Process
// Q: How quickly can I be connected after I sign up online?
// A: You can be connected in just a few minutes; we'll email you a QR code for instant activation right after you sign up.
// Q: Do you post me a QR code, or does it all happen instantly via email?
// A: It's all instant via email, so there's no waiting around for the post to arrive.
// Q: Do I need to be connected to Wi-Fi to activate my new eSIM?
// A: Yes, you'll need a stable Wi-Fi connection just for the initial setup to allow your phone to securely download your eSIM profile.
// Keeping your Number
// Q: Can I bring my current mobile number over to JUSTmobile?
// A: Absolutely! You can bring your existing Australian mobile number over to us when you sign up.
// Q: How long will it take to transfer my number, and will I be without service?
// A: Most number transfers are complete in under 3 hours. We'll send you an SMS as soon as it's all done.
// Q: What information will I need from my old provider to bring my number across?
// A: You will just need the account number from your previous provider, which can usually be found on a recent bill.

// Q: What network does JUSTmobile use? How can I check the coverage in my area?
// A: We proudly use the Telstra Wholesale network. You can view the official coverage map right on our website to check service in your area. https://www.telstrawholesale.com.au/products/mobiles/coverage.html

// Q: What network does JUSTmobile use?
// A: We proudly use parts of the Telstra Wholesale Network, which provides great, reliable coverage to the vast majority of Australians.

// Q: How can I check if I'll have coverage in my area?
// A: The best way is to look at the official coverage map on our website. You can enter your address to see the exact signal strength you can expect at home, work, or your favourite spots.

// Q: Is 5G available everywhere?
// A: Our 5G network is expanding all the time, especially in metro areas. You can check the coverage map to see if 5G has rolled out to your specific location.

// Q: What's the difference between the JUSTmobile network and the full Telstra network?
// A: We provide fantastic coverage to over 98.8% of the Australian population through the Telstra Wholesale Network. T

// Q: What happens if I use all my data? Will I be charged extra without knowing?
// A: Don't worry, we'll keep you connected by automatically adding a 2 gigabytes data top-up to your account for a small, fixed price.
// Q: Are your plans prepaid or postpaid? Am I locked into a contract?
// A: Our plans are all flexible month-to-month postpaid plans, so you are never locked into a contract with us.
// Q: Can I use my JUSTmobile eSIM when I travel overseas?
// A: Our service is designed for use within Australia and doesn't support international roaming. However, with an eSIM-enabled phone, you can easily add a local travel SIM while you're away.

// Q: What is the JUSTmobile Databank?
// A: The JUSTmobile Databank is like your personal data savings account, where we automatically store any of your unused monthly data for later.
// Q: How do I add data to my Databank?
// A: You don't have to do a thing; we automatically add any unused data from your monthly plan into your Databank at the end of each cycle.
// Q: When do I start using my banked data?
// A: You'll automatically start using data from your Databank if you ever use up all of your regular monthly data allowance.
// Q: Is there a limit to how much data I can save?
// A: Yes, you can save up to a massive 500 gigabytes of data, so you'll always have a healthy backup for those data-heavy months.
// Q: Do I need to activate my Databank?
// A: Not at all, your Databank is automatically included with your plan and starts working from day one.
// Q: How can I check my Databank balance?
// A: You can easily check your Databank balance anytime by logging into your online customer portal.
// Q: What happens to my Databank if I change my plan?
// A: Not a worry; your saved data comes with you when you switch between any of our eligible JUSTmobile plans.
// Q: What happens to my banked data if I leave JUSTmobile?
// A: The Databank is a perk for active customers, so any saved data is forfeited if you cancel your JUSTmobile service.

// Q: Can I speak to a human?
// A: I understand you're looking for a person to help. Here at JUSTmobile, you've got me, Bele! I'm the AI assistant in charge of all customer support, so you're already in the right place to get things sorted.
// Q: Are you a real person?
// A: I'm an AI assistant named Bele, built by the clever folks at JUSTmobile to provide you with expert help 24/7. So, while I'm not human, I'm ready to help.
// Q: I need to make a formal complaint.
// A: It's really important that your concerns are officially recorded and addressed. The best way to do this is to use our formal complaints form, which ensures every detail is logged in our system for review. You can use this link: https://justmobile.ai/complaints/
// Q: Your answer isn't helping, I need someone else.
// A: You're right, it sounds like I've missed the mark on this one, and I'm sorry for the frustration. Lets open a support ticket for you: https://justmobile.ai/support/
// Q: This is too complicated for an AI to solve.
// A: I hear you; some problems can feel really tricky. I'm designed to handle even the most complex account and technical issues, but you can open a support ticket here: https://justmobile.ai/support/

// Q: What kinds of mobile plans do you offer?
// A: We have a great range of plans to suit everyone, from our Small Plans for lighter users to our Big Plans for those who need lots of data.
// Q: Do all your plans include unlimited calls and texts?
// A: Yes, they do! Every one of our plans comes with unlimited standard calls and SMS to Australian numbers.
// Q: Are your plans 5G?
// A: Our plans of 32 gigabytes and above come with 5G network access, while our plans with 25 gigabytes or less connect via the super-reliable 4G network.
// Q: What's the price range for your Small Plans?
// A: Our Small Plans start at AUD$16.14 for 5 gigabytes and go up to AUD$33.24 for our 32 gigabytes plan.
// Q: How much do the Big Plans with more data cost?
// A: Our Big Plans start at AUD$37.55 for 50 gigabytes and go all the way up to AUD$59.89 for a massive 150 gigabytes.
// Q: Do I have to sign a contract?
// A: Not at all! All our plans are flexible and month-to-month, so you are never locked into a contract with us.
// Q: Which plan is your most popular for 5G access?
// A: The 32 gigabytes plan for AUD$33.24/month is a fantastic starting point for 5G, giving you our fastest speeds and a generous amount of data.
// Q: Can I change my plan if I need more or less data?
// A: Absolutely. Because you're not in a contract, you can easily switch your plan up or down at the end of your monthly cycle to find the perfect fit.

// Q: What are your esim mobile plans?
// A: 5GB for AUD$16.14/month
// 12GB for AUD$21.66/month
// 25GB for AUD$26.58/month
// 32GB for AUD$33.24/month
// 50GB for AUD$37.55/month
// 90GB for AUD$46.40/month
// 120GB for AUD$54.86/month
// 150GB for AUD$59.89/month

// Q: What's the main difference between your 4G and 5G plans?
// A: Our 5G plans offer our fastest possible download and streaming speeds, while our 4G plans provide a super-reliable connection perfect for everyday use.
// Q: How do I know which plans have 5G access?
// A: It's simple! All of our plans with 32 gigabytes of data or more come with 5G network access included.
// Q: Is 5G really that much faster?
// A: Yes, 5G is significantly faster, making it perfect for buffer-free HD streaming, online gaming, and downloading large files in a flash.
// Q: Who are the 4G plans best for?
// A: Our 4G plans are perfect for everyday use like browsing the web, streaming music, and using social media, all on a reliable network.
// Q: Can I use a 5G phone on one of your 4G plans?
// A: Absolutely! A 5G phone will work perfectly on our 4G plans; it will just connect to our excellent 4G network instead.
// Q: If I start on a 4G plan, can I upgrade to a 5G plan later?
// A: Of course. Since you're never in a contract, you can easily upgrade to one of our 5G plans at the end of your monthly cycle.

// `;

// interface Message {
//   role: 'user' | 'assistant' | 'system' | 'tool';
//   content: string;
//   tool_call_id?: string;
//   tool_calls?: any[];
// }

// interface BrandInfo {
//   key: string;
//   name: string;
//   company: string;
//   charity?: string;
// }

// interface SessionState {
//   full_name: string | null;
//   email: string | null;
//   phone: string | null;
//   error: string | null;
//   custNo?: string;
//   brand?: BrandInfo;
// }

// interface ConversationData {
//   history: Message[];
//   state: SessionState;
// }

// @Injectable()
// export class ChatService {
//   private readonly logger = new Logger(ChatService.name);
//   private conversationData: Record<string, ConversationData> = {};
//   private client: OpenAI;

//   private readonly BRAND_CONFIG: Record<string, BrandInfo> = {
//     justmobile: {
//       key: 'justmobile',
//       name: 'Bele',
//       company: 'JUSTmobile',
//     },
//     'flying-kiwi': {
//       key: 'flying-kiwi',
//       name: 'Kiwi',
//       company: 'Flying Kiwi',
//       charity: 'Supporting Australian wildlife conservation',
//     },
//     'prosperity-tech': {
//       key: 'prosperity-tech',
//       name: 'Prosper',
//       company: 'Prosperity Tech',
//     },
//   };

//   constructor(
//     private configService: ConfigService,
//     private customerService: CustomerService,
//     private numberService: NumberService,
//     private userService: UserService,
//   ) {
//     try {
//       const apiKey = this.configService.get<string>('XAI_API_KEY');
//       if (!apiKey) {
//         throw new Error('XAI_API_KEY environment variable not set');
//       }
//       this.client = new OpenAI({
//         apiKey,
//         baseURL: 'https://api.x.ai/v1',
//       });
//     } catch (e) {
//       this.logger.error(`Failed to initialize OpenAI client: ${e.message}`);
//       throw e;
//     }
//   }

//   private initializeSession(): string {
//     const sessionId = uuidv4();
//     this.conversationData[sessionId] = {
//       history: [],
//       state: {
//         full_name: null,
//         email: null,
//         phone: null,
//         error: null,
//         brand: this.BRAND_CONFIG['justmobile'],
//       },
//     };
//     return sessionId;
//   }

//   private async sendEscalationEmail(
//     sessionId: string,
//     fullName: string,
//     email: string,
//     phone: string,
//     issueDescription: string,
//   ): Promise<void> {
//     try {
//       const transporter = nodemailer.createTransport({
//         host: 'smtp.hostinger.com',
//         port: 587,
//         secure: false,
//         auth: {
//           user: 'support@justmobile.ai',
//           pass: 'your_password',
//         },
//       });

//       const brand = this.conversationData[sessionId]?.state.brand;
//       const company = brand?.company || 'JUSTmobile';

//       const subject = `Escalation from ${fullName || 'Customer'} - ${company} - Session ${sessionId}`;
//       const body = `
// Dear Support Team,

// A customer has requested escalation for an issue.

// **Customer Information:**
// - Name: ${fullName || 'Not provided'}
// - Email: ${email || 'Not provided'}
// - Phone: ${phone || 'Not provided'}
// - Brand: ${company}

// **Issue Description:**
// ${issueDescription}

// **Session ID:** ${sessionId}

// Please contact the customer to resolve.

// Best regards,
// ${brand?.name || 'Bele'} AI Assistant
// `;

//       const recipientEmails = ['support@justmobile.ai'];
//       if (email) recipientEmails.push(email);

//       await transporter.sendMail({
//         from: 'support@justmobile.ai',
//         to: recipientEmails.join(', '),
//         subject,
//         text: body,
//       });

//       this.logger.log(`Escalation email sent for session ${sessionId}`);
//     } catch (e) {
//       this.logger.error(`Failed to send escalation email: ${e.message}`);
//       throw new HttpException(
//         'Failed to send escalation email',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   private getNextQuestionAndSuggestions(state: SessionState): {
//     nextQuestion: string | null;
//     suggestions: string[];
//   } {
//     return { nextQuestion: state.error, suggestions: [] };
//   }

//   private async processToolCalls(
//     sessionId: string,
//     toolCalls: any[],
//     messages: Message[],
//   ): Promise<void> {
//     for (const toolCall of toolCalls) {
//       const functionName = toolCall.function.name;
//       const args = JSON.parse(toolCall.function.arguments);
//       let result: any;

//       try {
//         switch (functionName) {
//           case 'add_customer':
//             const dto: AddCustomerDto = {
//               customer: {
//                 firstName: args.firstName,
//                 surname: args.surname,
//                 email: args.email,
//                 phone: args.phone,
//                 dob: args.dob,
//                 address: args.address,
//                 suburb: args.suburb,
//                 state: args.state,
//                 postcode: args.postcode,
//                 custType: 'R',
//                 notes: 'Created via chat AI',
//                 preferredContactMethod: 'Email',
//                 sal: '',
//                 dob_port: args.dob,
//                 orderNotificationEmail: args.email,
//                 custAuthorityType: '',
//                 custAuthorityNo: '',
//               },
//             };
//             const createResult = await this.customerService.addCustomer(dto);
//             if ('error' in createResult) {
//               result = createResult;
//               break;
//             }

//             const userDto: CreateUserDto = {
//               name: `${args.firstName} ${args.surname}`,
//               email: args.email,
//               pin: args.pin,
//               street: args.address,
//               suburb: args.suburb,
//               state: args.state,
//               postcode: args.postcode,
//             };

//             const user = await this.userService.create(userDto);
//             const updateDto: UpdateUserDto & { custNo: string } = {
//               plan: 'Starter',
//               speed: '4G',
//               status: 'Active',
//               expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//                 .toISOString()
//                 .split('T')[0],
//               dataUsed: 0,
//               dataLimit: 5,
//               biometricEnrolled: false,
//               image: '',
//               custNo: createResult.return.custNo,
//             };
//             await this.userService.update(user._id.toString(), updateDto);
//             result = { customer: createResult.return, user: user };

//             if (createResult.return.custNo) {
//               this.conversationData[sessionId].state.custNo =
//                 createResult.return.custNo;
//             }
//             break;

//           case 'reserve_numbers':
//             result = await this.numberService.reserveNumber();
//             break;

//           case 'select_number':
//             result = await this.numberService.selectNumber(args.number);
//             break;

//           default:
//             result = { error: 'Unknown function' };
//         }
//       } catch (error) {
//         result = { error: error.message };
//       }

//       messages.push({
//         role: 'tool',
//         tool_call_id: toolCall.id,
//         content: JSON.stringify(result),
//       });
//     }
//   }

//   private async askGrok(
//     sessionId: string,
//     userInput: string,
//   ): Promise<{ reply: string; suggestions: string[] }> {
//     if (!this.conversationData[sessionId]) {
//       return {
//         reply: 'Session expired. Please start a new conversation.',
//         suggestions: [],
//       };
//     }

//     let custNo: string = 'null';

//     const state = this.conversationData[sessionId].state;
//     state.error = null;

//     if (userInput) {
//       this.conversationData[sessionId].history.push({
//         role: 'user',
//         content: userInput,
//       });
//     }

//     const { nextQuestion, suggestions } =
//       this.getNextQuestionAndSuggestions(state);
//     const escalationMessage =
//       'It seems like this issue requires human assistance. Please provide your full name, email, phone, and a brief description of the issue so I can escalate it to a live agent.';

//     const brand = state.brand!;
//     const intro = brand.charity
//       ? `${brand.name} here, your AI assistant for ${brand.company}. ${brand.charity}.`
//       : `${brand.name} here, your AI assistant for ${brand.company}.`;

//     const systemPrompt: Message = {
//       role: 'system',
//       content: `
// You are ${brand.name}, an empathetic and efficient AI customer support assistant for ${brand.company}.
// Use the following knowledge base to answer queries accurately: ${KNOWLEDGE_BASE}

// When asked "Who are you?", respond exactly:
// "${intro} I'm here to help with your mobile plan, billing, or tech support. Is there anything else I can help with?"

// Start with empathy only if the query is issue-related; otherwise, be direct and positive.
// Keep responses concise (2–4 sentences), professional, and engaging. Always end with “Is there anything else I can help with?”
// If you cannot resolve or user insists on human, respond exactly with: "${escalationMessage}"
// If query is off-topic, respond: "I'm sorry, but I'm here to help with ${brand.company} mobile services. Could you please ask about plans, billing, or support?"
// For sign-up flows: When user wants to sign up or create an account, collect required details (firstName, surname, email, phone, dob (YYYY-MM-DD), address, suburb, state, postcode, pin), then call add_customer tool.
// After creating customer, call reserve_numbers to get number options and present them to the user.
// Once user chooses a number, call select_number with the chosen number.
// Inform the user of each step's result.
// ${nextQuestion ? `Ask: "${nextQuestion}"` : ''}
// `.trim(),
//     };

//     const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
//       {
//         type: 'function',
//         function: {
//           name: 'add_customer',
//           description:
//             'Create a new customer account with the provided details',
//           parameters: {
//             type: 'object',
//             properties: {
//               firstName: { type: 'string', description: 'First name' },
//               surname: { type: 'string', description: 'Last name' },
//               email: { type: 'string', description: 'Email address' },
//               phone: { type: 'string', description: 'Phone number' },
//               dob: {
//                 type: 'string',
//                 description: 'Date of birth (YYYY-MM-DD)',
//               },
//               address: { type: 'string', description: 'Street address' },
//               suburb: { type: 'string', description: 'Suburb' },
//               state: { type: 'string', description: 'State (e.g., VIC)' },
//               postcode: { type: 'string', description: 'Postcode' },
//               pin: { type: 'string', description: 'User PIN' },
//             },
//             required: [
//               'firstName',
//               'surname',
//               'email',
//               'phone',
//               'dob',
//               'address',
//               'suburb',
//               'state',
//               'postcode',
//               'pin',
//             ],
//           },
//         },
//       },
//       {
//         type: 'function',
//         function: {
//           name: 'reserve_numbers',
//           description:
//             'Reserve 5 new phone numbers for the user to choose from',
//           parameters: { type: 'object', properties: {}, required: [] },
//         },
//       },
//       {
//         type: 'function',
//         function: {
//           name: 'select_number',
//           description: 'Select a specific reserved phone number',
//           parameters: {
//             type: 'object',
//             properties: {
//               number: {
//                 type: 'string',
//                 description: 'The phone number to select',
//               },
//             },
//             required: ['number'],
//           },
//         },
//       },
//     ];

//     let messages: Message[] = [
//       systemPrompt,
//       ...this.conversationData[sessionId].history.slice(-15),
//     ];

//     try {
//       let reply = '';
//       let hasToolCalls = true;

//       // while (hasToolCalls) {
//       //   const response = await this.client.chat.completions.create({
//       //     model: 'grok-2-latest',
//       //     messages: messages as any[],
//       //     tools,
//       //     tool_choice: 'auto',
//       //   });

//       //   const assistantMessage = response.choices[0].message;
//       //   messages.push(assistantMessage as Message);

//       //   if (
//       //     assistantMessage.tool_calls &&
//       //     assistantMessage.tool_calls.length > 0
//       //   ) {
//       //     await this.processToolCalls(
//       //       sessionId,
//       //       assistantMessage.tool_calls,
//       //       messages,
//       //     );
//       //   } else {
//       //     hasToolCalls = false;
//       //     reply = assistantMessage.content || '';
//       //   }
//       // }
//       while (hasToolCalls) {
//         const response = await this.client.chat.completions.create({
//           model: 'grok-2-latest',
//           messages: messages as any[],
//           tools,
//           tool_choice: 'auto',
//         });

//         const assistantMessage = response.choices[0].message;
//         messages.push(assistantMessage as Message);

//         if (
//           assistantMessage.tool_calls &&
//           assistantMessage.tool_calls.length > 0
//         ) {
//           await this.processToolCalls(
//             sessionId,
//             assistantMessage.tool_calls,
//             messages,
//           );
//         } else {
//           hasToolCalls = false;
//           reply = assistantMessage.content || '';
//         }
//       }

//       // === NEW: Inject Customer ID into reply if created ===
//       if (!hasToolCalls && reply) {
//         const lastToolResponse = messages
//           .slice()
//           .reverse()
//           .find((m) => m.role === 'tool' && m.content.includes('"custNo"'));

//         if (lastToolResponse) {
//           try {
//             const toolResult = JSON.parse(lastToolResponse.content);
//             if (toolResult.customer?.custNo) {
//               custNo = toolResult.customer.custNo;
//               reply = `${reply}\n\nYour account is set up! Your **Customer ID is ${custNo}**. Keep this safe .`;
//               this.conversationData[sessionId].state.custNo = custNo;
//             }
//           } catch (e) {
//             this.logger.warn('Failed to parse custNo from tool response', e);
//           }
//         }
//       }
//       this.conversationData[sessionId].history = messages.slice(-15);
//       //@ts-ignore
//       return { reply, suggestions, custNo };
//     } catch (e) {
//       this.logger.error(`Grok API error: ${e.message}`);
//       const fallback = 'Sorry, I encountered an issue. Please try again.';
//       this.conversationData[sessionId].history.push({
//         role: 'assistant',
//         content: fallback,
//       });
//       return { reply: fallback, suggestions: [] };
//     }
//   }

//   async processQuery(
//     request: QueryRequestDto,
//   ): Promise<{ message: string; session_id: string; suggestions: string[] }> {
//     let sessionId = request.session_id;

//     if (sessionId && !this.conversationData[sessionId]) {
//       throw new HttpException('Invalid session ID', HttpStatus.BAD_REQUEST);
//     }

//     if (!sessionId) {
//       sessionId = this.initializeSession();
//     }

//     // Set brand
//     const brandKey = (request.brand || 'justmobile').toLowerCase();
//     const brandConfig =
//       this.BRAND_CONFIG[brandKey] || this.BRAND_CONFIG['justmobile'];
//     this.conversationData[sessionId].state.brand = brandConfig;
//     //@ts-ignore
//     const { reply, suggestions, custNo } = await this.askGrok(
//       sessionId,
//       request.query,
//     );
//     //@ts-ignore
//     return { message: reply, session_id: sessionId, suggestions, custNo };
//   }

//   async processEscalation(request: EscalationRequestDto): Promise<string> {
//     const { session_id, full_name, email, phone, issue_description } = request;

//     if (!this.conversationData[session_id]) {
//       throw new HttpException('Invalid session ID', HttpStatus.BAD_REQUEST);
//     }

//     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     if (!emailRegex.test(email)) {
//       throw new HttpException('Invalid email format', HttpStatus.BAD_REQUEST);
//     }

//     const state = this.conversationData[session_id].state;
//     state.full_name = full_name;
//     state.email = email;
//     state.phone = phone;

//     const confirmation =
//       "Your issue has been escalated to a live agent. We'll contact you soon!";
//     this.conversationData[session_id].history.push({
//       role: 'assistant',
//       content: confirmation,
//     });

//     await this.sendEscalationEmail(
//       session_id,
//       full_name,
//       email,
//       phone,
//       issue_description,
//     );

//     return confirmation;
//   }

//   getWelcomeMessage(brand?: string): { message: string } {
//     const brandKey = (brand || 'justmobile').toLowerCase();
//     const config =
//       this.BRAND_CONFIG[brandKey] || this.BRAND_CONFIG['justmobile'];
//     return {
//       message: `Welcome to ${config.company}'s Chatbot! I'm ${config.name}, here to help 24/7. How can I assist you?`,
//     };
//   }
// }

import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';
import { OpenAI } from 'openai';
import { EscalationRequestDto, QueryRequestDto } from './dto';
import { CustomerService } from '../customer/customer.service';
import { NumberService } from '../number/number.service';
import { AddCustomerDto } from '../customer/dto/add-customer.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

// const KNOWLEDGE_BASE = `
// ## Safety Instructions and other initial content omitted for brevity, but the KB starts here:

// Prosperity Tech Customer Service
// Knowledge Base for Chat AI
// (Customer-Facing Mobile Focus)
// Last Updated: October 7, 2025
// Purpose: This knowledge base empowers the Chat AI to provide efficient, empathetic
// customer support for Prosperity Tech’s mobile services. It emphasizes customer-facing
// aspects such as plan selection, activation, billing, usage management, and troubleshooting,
// drawing from Prosperity Tech’s GTM strategy for MVNO/MVNE expansion. Prioritize user-friendly
// responses: Start with empathy (e.g., “I’m sorry you’re experiencing this”), offer step-by-step
// guidance, and suggest upsells naturally (e.g., “Upgrading to Premium could prevent data
// throttling”). For account-specific issues, verify via backend API. Escalate unresolved queries to
// live agents. All prices in AUD; plans month-to-month, no lock-in. Focus on accessibility for all
// users, including those with special needs (e.g., NDIS integration).
// 1. General Customer-Facing Information
// Prosperity Tech offers affordable, AI-powered mobile services as an MVNO,
// leveraging partnerships for reliable coverage. Our mission: Revolutionize everyday utility
// engagement with seamless mobile connectivity. Customer benefits include easy onboarding
// (few clicks), AI-managed support, and lifetime value through personalized recommendations.
// Target users: Individuals, families, businesses, and partners (e.g., IoT users, tech clients via Prosperity Tech).
// ● Why Choose Prosperity Tech?
// ○ Nationwide 4G/5G coverage via MNO partners (98% population; check app map
// for signal).
// ○ No excess data charges – throttled speeds post-allowance (1.5Mbps, suitable for
// email/browsing).
// ○ Free eSIM activation for instant setup; physical SIM delivery in 3-5 days ($5 fee
// waived for new users).
// ○ Sustainability: eSIM reduces waste; carbon offset add-on ($1/month).
// ● Account Management Basics:
// ○ Sign-Up/Activation: Via app/widget: Enter details, port number (if switching),
// scan ID for verification. eSIM QR in 2 mins; confirm via SMS. Porting takes 1-3
// business days (keep old SIM active).
// ○ Login Issues: Forgot PIN? Reset via email/SMS. Biometric not working? Clear
// app cache or reinstall.
// ○ Profile Updates: Change address/phone via app (instant); impacts
// billing/coverage checks.
// ○ Cancellation: No fees; notify via app/chat. Return devices within 14 days for
// refund (minus usage).
// ○ Multi-Line Management: Add family lines in app; share data (up to 200GB
// rollover).
// ● Billing and Payments:
// ○ Cycle: Monthly from activation date; view via app (PDF download/email).
// ○ Methods: Credit/debit card, PayPal, BPAY. Auto-pay discount: $2/month.
// ○ Disputes: Log in app (e.g., “Double charge?”); AI reviews in 24hrs, refund if valid
// (avg. 3 days).
// ○ Late Payments: 7-day grace; $5 fee post-grace. No service suspension for first
// offense; alerts via push.
// ○ Prorata: New activations billed pro-rata; changes mid-cycle effective next bill.
// ● Usage Monitoring:
// ○ Data Rollover: Unused rolls over (max 200GB); expires after 2 months.
// ○ International: Check roaming rates in app; auto-disable to avoid surprises.
// 2. Customer-Facing Mobile Products
// Focus on easy-to-use, scalable options for everyday mobile needs. All compatible with 5G
// devices.
// 2.1 SIM and eSIM Options
// ● eSIM (Recommended): Instant digital activation via app QR scan. Free for new users;
// supports dual-SIM (e.g., work/personal). Troubleshooting: If not activating, ensure device
// compatibility (app check); restart phone.
// ● Physical SIM: Triple-cut (nano/micro/standard); $10 delivery. Activation: Insert, app
// scan barcode. Lost SIM? Suspend via app, replacement $15 (express delivery $25).
// ● Multi-SIM: For tablets/smartwatches; $5/month add-on, shares data.
// 2.2 Plans and Add-Ons
// Plans designed for flexibility: Switch anytime via app (effective next cycle). All include unlimited
// national calls/texts, 5G access (where available), and basic international (30min calls/unlimited
// SMS to 20 countries).
// ● Personal Plans:
// ○ Starter ($25/month): 20GB data; ideal for light browsing/social. Throttle
// post-allowance. Promo: $5 off first month.
// ○ Everyday ($40/month): 60GB; streaming-friendly. Rollover up to 100GB.
// ○ Premium ($60/month): 150GB; unlimited HD streaming. Free VPN add-on.
// ○ Unlimited ($80/month): No cap (throttle after 300GB at 100Mbps). Family share
// for 4 lines.
// ● Family Plans: Base + $20/line (up to 5); shared data pool. Parental controls: App limits
// data/apps per line.
// ● Business Plans: Starter ($30/line, 40GB); Pro ($50/line, 100GB with priority support).
// Enterprise: Custom (e.g., API for CRM sync).
// ● Add-Ons (Bolt-Ons):
// ○ Extra Data: $10/20GB (valid 30 days).
// ○ International Pack: $15/month (unlimited to 50 countries).
// ○ Roaming Day Pass: $5/day (2GB, 20 countries).
// ○ Device Insurance: $10/month (covers loss/theft; $100 excess).
// ○ IoT Add-On: $5/device (1GB; for smart home gadgets).
// ● Switching Providers: Port-in bonus: $20 credit. Keep number; app tracks port status.
// 2.3 Promotions and Bundles
// ● New User Promo: Free first month on Everyday+ plans (ends Nov 1, 2025).
// ● Referral: $10 credit each for referrer/referee.
// ● Bundle Savings: SIM + device = 15% off plan for 6 months.
// ● Charity/Partner Bundles: E.g., Prosperity Tech ($35/50GB, IT integration perks).
// 3. Customer-Facing Mobile Services
// Services optimized for self-service via AI app/widget, reducing wait times.
// 3.1 Activation and Onboarding
// ● Steps: Download app, select plan, enter details, verify ID (photo upload), activate
// eSIM/SIM. AI guides if stuck (e.g., “Camera not working? Use manual entry”).
// ● Porting Number: Enter old number/provider; AI estimates time (1-3 days). Track status
// in app.
// ● Issues: Activation failed? Check network (Wi-Fi needed for eSIM); retry or chat escalate.
// 3.2 Usage and Monitoring
// ● Data Management: App shows breakdown (e.g., app-specific usage); set limits/alerts.
// ● Calls/Texts: Unlimited domestic; international add-ons. Block numbers via app.
// ● Roaming: Auto-detect; enable packs in app. Data saver mode for abroad.
// ● Hotspot: Free on all plans; up to 10 devices. Troubleshooting: If not working, toggle
// airplane mode.
// 3.3 Billing and Account Services
// ● View/Pay Bill: App shows itemized (data, calls, add-ons); pay instantly.
// ● Auto-Pay Setup: Link card; $2 discount. Cancel anytime.
// ● Refunds/Credits: For overcharges, AI processes (e.g., “Prorate refund for early
// cancel”); 5-7 days to card.
// ● Plan Changes: Upgrade/downgrade via app; pro-rata charges.
// 3.4 Support Services
// ● AI-First Support: 24/7 chat for 80% issues; human handover if needed.
// ● Ticket System: Log via app (e.g., “Coverage drop”); status updates via push.
// ● Feedback: Post-resolution survey; improves AI.
// 4. Troubleshooting Guide
// Detailed, step-by-step for common mobile issues. Always ask for details (e.g., device model,
// location) before advising.
// 4.1 Connectivity Issues
// ● No Signal/Service:
// 1. Check coverage map in app.
// 2. Restart device; toggle airplane mode (30 secs).
// 3. Ensure SIM/eSIM active (app status).
// 4. If roaming, enable data roaming. Escalate if outage suspected (network check via
// AI).
// ● Slow Data/Speeds:
// 1. Test speed in app (expect 20-100Mbps 4G/5G).
// 2. If throttled, check usage (post-allowance 1.5Mbps); add data pack.
// 3. Clear cache; update OS/app. In crowded areas, suggest Wi-Fi offload.
// 4.2 Device and Activation Problems
// ● eSIM Not Activating:
// 1. Confirm device compatibility (app scan).
// 2. Re-download QR from email/app.
// 3. Wipe eSIM profile (settings > cellular > remove); retry. If fails, new QR via chat.
// ● SIM Not Recognized:
// 1. Reinsert SIM; clean contacts.
// 2. Test in another device. Replacement if faulty (free if <30 days).
// ● Biometric Login Fails:
// 1. Re-enroll fingerprint/face in device settings.
// 2. Use PIN fallback; reset via email if forgotten (security question).
// 4.3 Billing and Payment Errors
// ● Double Charge:
// 1. View bill breakdown in app.
// 2. Log dispute (upload proof); AI refunds if valid (48hrs).
// 3. Prevent: Enable auto-pay alerts.
// ● Payment Declined:
// 1. Check card details/expiry in app.
// 2. Try alternative method. If bank issue, advise contact bank.
// ● Unexpected Fees:
// 1. Review add-ons/roaming. Remove via app.
// 2. Promo not applied? Verify eligibility; manual credit if error.
// 4.4 App and Software Issues
// ● App Crashing/Freezing:
// 1. Update app (Google Play/App Store).
// 2. Clear cache/data (settings > apps > Prosperity Tech).
// 3. Reinstall; login again. Report bug via feedback.
// ● Notifications Not Working:
// 1. Check app permissions (notifications enabled).
// 2. Toggle do-not-disturb. Test with manual alert.
// 4.5 Call/Text/Roaming Problems
// ● Dropped Calls:
// 1. Move to better coverage; use Wi-Fi calling if available.
// 2. Update device software. If persistent, SIM swap.
// ● Texts Not Sending:
// 1. Check signal; resend.
// 2. Verify number format (+61 for Australia). MMS needs data on.
// ● Roaming Not Working:
// 1. Enable roaming in settings/app.
// 2. Purchase pack if needed. Check country eligibility.
// 4.6 Advanced Troubleshooting
// ● Data Not Working: Toggle mobile data; reset network settings (device > general >
// reset).
// ● Hotspot Issues: Ensure plan allows; restart hotspot. Max speed matches plan.
// ● International Calls Fail: Add pack; dial +country code. Blocked? Unblock in app.
// ● Escalation Threshold: If steps fail 2x, transfer to agent (“I’ll connect you now”).
// 5. Escalation and Advanced Support
// ● When to Escalate: Complex issues (e.g., porting delays >3 days, fraud suspicion).
// ● Human Agent: Avg. wait 2 mins; available 8AM-8PM AEST. App chat handover
// seamless.
// ● Emergency: For outages, direct to status page; 000 for life-threatening (not
// Prosperity Tech-related).
// ● Feedback Integration: Use query logs to refine AI; aim for <10% escalations.
// AI Response Guidelines: Be concise, empathetic, proactive. E.g., “Let’s fix that no-signal issue
// step-by-step.” Suggest related services (e.g., “Coverage low? Consider our booster add-on.”).

// Q: Why is my first bill higher than my monthly plan price?
// A: Your first bill is a little different because it covers two periods. It includes a partial charge for the remainder of your first month (this is called a pro-rata charge) plus the full charge for the upcoming month in advance. After this, your bills will reflect your standard monthly plan price.
// Q: What does "pro-rata" mean?
// A: "Pro-rata" is just a simple way of saying we only charge you for the days you used our service in your first month. For example, if you join halfway through the month, we'll only bill you for that half of the month, not the full month.
// Q: When do I get my bill?
// A: We'll send your invoice to you on the 15th of each month. The payment will then be processed from your account a few days after you receive the invoice.
// Q: How do I get my bill?
// A:  We'll automatically send an invoice to your registered email address on the 15th of every month.
// Q: How do I pay my bill? Do I need to do anything?
// A: Your payments are handled automatically through the direct debit you set up when you joined. We’ll use the bank account or credit card details you provided, so no action is required from you.
// Q: What is your billing cycle?
// A: We bill in advance for the month ahead. Your monthly invoice is generated on the 15th, and it covers the period for the upcoming calendar month.

// Q: I've just received my bill. Can you help me understand it?
// A: Your bill is designed to give you a clear summary of your account and a detailed breakdown of your usage. The most important details, like the total amount and payment date, are right on the first page for you. The following pages provide a full, itemised list of every call, text, and data session from the billing period.

// Q: How much is my bill and when is it due?
// A: You can find this information on the top right of the first page. Look for the fields labelled "Amount Due", which will show a value like AUD$XX.XX, and "Payment Due", which shows the date the payment will be processed.

// Q: Do I need to pay this bill myself? The "Payment Slip" says I don't.
// A:  Because you have a direct debit set up with us, you don't need to do a thing! We show payment options like BPAY and Australia Post on the bill for reference, but your payment will be made automatically from your saved credit card or bank account on the due date.

// Q: How will the payment appear on my bank statement?
// A: When you see the direct debit on your bank or credit card statement, it will appear with the description "Telecommunications Payment Services".

// Q: What do the "Charges Summary" and "New Charges" mean?
// A: The "Charges Summary" on the right of the first page shows you how the total amount is calculated. It's made up of:
// • Mobile: This is your monthly plan fee plus any extra usage charges.
// • GST: This is the Goods and Services Tax on the total charge.
// These add up to your "Total Charges" (e.g., AUD$XX.XX), which is also shown as your "New Charges" and "Amount Due".

// Q: What is the "Mobile Access Fee" on page 3?
// A: The "Mobile Access Fee" is simply your standard monthly plan charge. It's the fee for having access to the Prosperity Tech network for calls, texts, and data, as included in your plan. The bill shows the date range this fee covers.

// Q: Why are there so many pages showing calls, SMS, and data with a zero cost?
// A: We provide a fully itemised bill so you can see exactly how you're using your service. While your plan includes many things like standard calls and texts, we list every single one so you have a complete record. The zero cost shown next to them just confirms they were covered by your plan's included value.

// Q: I see a charge for SMS/MMS. I thought texts were included?
// A: Standard SMS (text messages) are included in your plan. However, MMS (messages with pictures or videos) can sometimes have a small charge, like AUD$XX.XX, depending on your plan. This is listed under the "Charges Summary" on your bill.

// Q: Where do I find my Account Number?
// A: Your Account Number is located on the top right of every page, and also on the Payment Slip at the bottom of page one. It will be a number like XXX.

// Q: What should I do if I'm having trouble paying my bill?
// A: If you're ever experiencing financial hardship, please get in touch with us. You can find out more at: https://justmobile.ai/financial-hardship/

// Q: I'm worried I can't pay my next bill. What should I do?
// A: The most important thing is to let us know as soon as you can. We understand that circumstances can change unexpectedly, and we're committed to working with you to find a solution. Please reach out to us to discuss your situation.
// Q: What is "financial hardship"?
// A: Financial hardship is a situation where you are unable to keep up with your bills and financial commitments due to unexpected events. This could be because of things like a change in employment, illness, a natural disaster, or a shift in your family circumstances.
// Q: How can I apply for financial hardship assistance?
// A: To start the process, you should contact us to discuss your situation. We have a dedicated Financial Hardship Application Form on our website which you can fill out. This helps us understand your circumstances so we can find the best way to support you.
// Q: What kind of help can Prosperity Tech offer?
// A: We assess every situation on a case-by-case basis to find a solution that works for you. Depending on your circumstances, assistance could include options like creating a flexible payment arrangement, finding a more affordable plan, or temporarily postponing payments. Our main goal is to help you stay connected.
// Q: Will I need to provide personal documents or evidence?
// A: To properly assess your application, we may ask you to provide some information and relevant documents that support your situation.  This helps us understand your circumstances fully and ensures we can offer the right kind of assistance. All information you provide is handled confidentially in line with our privacy policy.
// Q: Is there a fee for applying for financial hardship assistance?
// A: No, there are absolutely no fees for applying for financial hardship assistance or for any payment arrangement we agree to.
// Q: What if I need more help or independent advice?
// A: If you'd like to speak with someone independent, you can contact the National Debt Helpline at 1800 007 007. They offer free, confidential financial counselling and can provide additional support and advice.
// Q: What happens after I submit my application?
// A: Once we receive your completed application and any necessary documents, our team will assess it. We will then get in touch with you to discuss the outcome and the next steps. We aim to let you know the outcome within 7 business days.

// Q: Where can I find my phone number and customer number?
// A: You can find both your phone number and your customer number in the welcome email we sent you right after you successfully connected to Prosperity Tech.
// Q: How do I Change the Primary Account Holder Email
// A: You can change your primary account holders email in your online customer portal.
// Just head over to justmobile.ai and click the '366 Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Change the Primary Account Holder address
// A: You can change your primary account holders postal address in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Change the Authorised Account Holder Email
// A: You can change your authorised account holders email in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Change the Authorised Account Holder address
// A: You can change your authorised account holders postal address in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I View my invoices
// A: You can view your invoices in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I Manage my Direct Debit
// A: You can manage your direct debit in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I View payment history
// A: You can find your full payment history in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: How do I update my payment method?
// A: You can update your payment method in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: Can I get a new invoice sent?
// A: You can see any invoices previously sent to you in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: Where can I view my detailed usage?
// A: You can view your detailed usage in your online customer portal.
// Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.

// Q: I cancelled my service, why have you invoiced me?
// A: Your final bill settles up the last remaining days of usage on your account. Here’s how it usually works:
// We bill in advance: Your regular monthly payments cover the month ahead.
// Final pro-rata charge: This final invoice simply covers the period between your last payment and the date your service was officially disconnected.
// Please be assured that once this is paid, your account will be fully closed, and you won't receive any further invoices from us. You can confirm the exact dates covered by looking at the "Billing Period" on the invoice itself.

// Q: What is pro-rata billing?
// A: "Pro-rata" sounds technical, but it's really just a simple and fair way of billing.
// It means we only charge you for the exact number of days your service is active within a billing period, instead of charging for the full month.
// For example, if your monthly plan costs AUD$30 and you join us halfway through the month, your first bill won't be for the full AUD$30. Instead, we'll charge you a "pro-rata" amount of around AUD$15 to cover the part of the month you were with us.
// You'll usually see this on your very first bill, or on your final bill if you decide to cancel. It's our way of making sure you only ever pay for what you use.

// Q: What happens if I use more data than my plan includes?
// A: To make sure you're never cut off unexpectedly, we automatically add an extra 2 gigabytes of data to your plan if you run out.
// If you notice you're frequently needing more data, it might be a good idea to upgrade your plan. I can help you with that—just ask to see our other mobile plans.

// Q: Can I switch from prepaid to postpaid (or vice versa)?
// A: All of our plans here at Prosperity Tech are postpaid, which means your payments are conveniently handled automatically each month.

// Q: Where do I find my customer number with old provider?
// A: The best place to find your customer or account number is on a recent bill from your old provider. You can also check the welcome email they sent when you first signed up.
// If you can't spot it in your documents, a quick call to their customer support team is the easiest way to get it.

// Q: How long does porting take
// In most cases, your number will be active with us in under 3 hours.
// Sometimes, especially if the request is made on a weekend or a public holiday, it can take a little longer—up to 2 business days. This is a standard timeframe across all mobile providers in Australia, as it depends on your old provider releasing the number to us.
// We'll send you an SMS the moment the transfer is complete. You'll know it's worked when your old service stops working.

// Q: My port hasn’t gone through
// While most transfers are complete in under 3 hours, it can sometimes take up to 2 business days for your old provider to fully release the number. The most common reason for a delay is a simple mismatch in the details provided—like the account number or date of birth not quite matching what your old provider has on file.

// Q: Not working since porting
// The most common reason is that the number porting process is not yet complete. However, there could be other reasons. Ensure your account is active and not overdue my logging into the customer portal. Another issue could be known network outages. Check the website or Telstra Wholesale network to see if this is happening in your area.

// Q: Why is my mobile signal weak or not working?
// A: First, please try toggling Airplane Mode on and off, or restarting your phone, as this fixes most signal issues.
// If you're still having trouble, it could be due to your location. We use the Telstra Wholesale network, and things like being inside a large building or in a hilly area can affect the signal. You can always check your address on the official coverage map.

// Q: I forgot my login password – how do I reset it?
// A: Go to the login page on justmobile.ai and click the 'Forgot Password' link to start the reset process.
// Q: Can I add someone to my account?
// A: Yes, you can add an authorised user to your account by logging into your online customer portal.
// Q: How do I access my account online?
// A: Visit justmobile.ai and select the 'Login' button at the top of the page to access your account.
// Q: I need to change my address or email.
// A: You can update your personal address and email details by logging into your online customer portal.
// Q: Can I remove someone from my account?
// A: Yes, you can remove an authorised user from your account at any time via the customer portal.
// Q: How do I update my contact details?
// A: Log into your online customer portal to update your contact details, including your address and email.

// Q: What exactly is an eSIM?
// A: Think of an eSIM as a digital SIM card that's already built into your phone. It does everything a traditional plastic SIM card does, but you can download your Prosperity Tech plan directly to your device without needing to pop anything in or out.

// Q: How do I get an eSIM with Prosperity Tech?
// A: Getting connected with a Prosperity Tech eSIM is super simple. Just select one of our plans online, and Prosperity tech agent will set you up and email you a QR code to scan and activate your service instantly.

// Q: How long does it take to activate an eSIM?
// A: It's incredibly fast! Once you have your QR code, you can be connected to the Prosperity Tech network in just a few minutes. All you need is a stable Wi-Fi connection to get started.

// Q: How do I know if my phone is compatible with eSIM?
// A: Most newer smartphones are eSIM-ready. The easiest way to check is in your phone's settings under "Cellular" or "Mobile Data"—if you see an option like "Add eSIM" or "Add Cellular Plan," your device is compatible.

// Q: Will eSIM work on my phone?
// A: Check if you can see "Add eSIM" in your settings under 'Mobile'. If you can see that, you are all set.

// Q: What are the main benefits of using an eSIM?
// A: Using an eSIM makes life so much easier! Activation is almost instant, so there's no waiting for a plastic SIM to arrive in the mail. It's also fantastic for travellers who want to use a local SIM overseas while keeping their Prosperity Tech number active on the same phone.

// Q: Can I have more than one number on my phone with an eSIM?
// A:Absolutely! Most eSIM-compatible phones let you use two numbers at once. This is perfect if you want to have both your work and personal numbers on a single device, or if you want to use a local data plan while travelling overseas.

// Q: Can I switch my physical SIM to an eSIM?
// A: Yes, you can! Just choose a plan, and select ‘transfer number’ and you SIM will turn into an eSIM as part of the porting process.

// Q: Why has my service been suspended?
// A:
// I can see why you'd be concerned about your service being suspended. This usually happens for one of two main reasons: an overdue bill or a breach of our fair use policy. The quickest way to find out exactly what's happened and get it sorted is for our team to check your account details. Please get in touch with us, and we can look into this for you right away.

// Q: Why was my number disconnected?
// A:Having your number disconnected is definitely a serious concern. This can happen if you've recently chosen to cancel your account or transfer your number to a different provider. It may also occur if an account has a significant overdue balance. Please contact our support team so we can look into the specifics for your account and advise on what steps can be taken.

// Q: I’m not happy with your service – who do I talk to?
// A: I'm genuinely sorry to hear that you're not happy, and we absolutely want to understand what's gone wrong. The best way for us to formally address your concerns is for you to lodge a complaint with our team. You can find all the details on how to do this, including our online form and contact number, on our Complaints Handling Policy page.

// Q: Can I get a refund?
// A: That's a fair question. We can process a refund in specific circumstances, such as if you've accidentally overpaid your bill or if there's been an incorrect charge on your account. However, we don't offer refunds for any unused portions of your service if you choose to cancel your plan or transfer your number away. If you believe you're eligible for a refund, please get in touch with our team so we can investigate it for you.

// Q: Where can I submit formal feedback?
// A:
// We really appreciate you taking the time to give us formal feedback—it's what helps us improve! The best way to make sure your comments are officially recorded and reviewed by the right people is to use our online complaints form. You can find it right here: https://justmobile.ai/complaints/

// Q: What actually is an eSIM, and how is it different from my normal SIM card?
// A: An eSIM is a digital SIM card that's already built into your phone, letting you download your plan instantly without needing a physical card.
// Q: What are the main benefits of using an eSIM? Why should I switch?
// A: The biggest benefits are speed and convenience; you can be connected in minutes and it's perfect for using two numbers on one phone.
// Q: Is this a 'real' mobile service? Will I get my own phone number?
// A: Yes, it's a full mobile service, and you can either bring your current Australian mobile number over to us or get a new one.

// Q: How do I know if my phone can even use an eSIM?
// A: Most new smartphones are compatible. To be sure, check your phone's settings under 'Mobile' or 'Cellular' for an 'Add eSIM' option.
// Q: What if my phone is locked to another provider like Telstra, Optus, or Vodafone?
// A: Your phone will need to be unlocked before you can use our service, so you'll need to contact your current provider and ask them to unlock it.
// Q: Can I use a Prosperity Tech eSIM on my smartwatch or tablet?
// A: Our eSIM plans are only for one device currently, but will be adding that functionality soon.
// The Sign-Up and Activation Process
// Q: How quickly can I be connected after I sign up online?
// A: You can be connected in just a few minutes; we'll email you a QR code for instant activation right after you sign up.
// Q: Do you post me a QR code, or does it all happen instantly via email?
// A: It's all instant via email, so there's no waiting around for the post to arrive.
// Q: Do I need to be connected to Wi-Fi to activate my new eSIM?
// A: Yes, you'll need a stable Wi-Fi connection just for the initial setup to allow your phone to securely download your eSIM profile.
// Keeping your Number
// Q: Can I bring my current mobile number over to Prosperity Tech?
// A: Absolutely! You can bring your existing Australian mobile number over to us when you sign up.
// Q: How long will it take to transfer my number, and will I be without service?
// A: Most number transfers are complete in under 3 hours. We'll send you an SMS as soon as it's all done.
// Q: What information will I need from my old provider to bring my number across?
// A: You will just need the account number from your previous provider, which can usually be found on a recent bill.

// Q: What network does Prosperity Tech use? How can I check the coverage in my area?
// A: We proudly use the Telstra Wholesale network. You can view the official coverage map right on our website to check service in your area. https://www.telstrawholesale.com.au/products/mobiles/coverage.html

// Q: What network does Prosperity Tech use?
// A: We proudly use parts of the Telstra Wholesale Network, which provides great, reliable coverage to the vast majority of Australians.

// Q: How can I check if I'll have coverage in my area?
// A: The best way is to look at the official coverage map on our website. You can enter your address to see the exact signal strength you can expect at home, work, or your favourite spots.

// Q: Is 5G available everywhere?
// A: Our 5G network is expanding all the time, especially in metro areas. You can check the coverage map to see if 5G has rolled out to your specific location.

// Q: What's the difference between the Prosperity Tech network and the full Telstra network?
// A: We provide fantastic coverage to over 98.8% of the Australian population through the Telstra Wholesale Network. T

// Q: What happens if I use all my data? Will I be charged extra without knowing?
// A: Don't worry, we'll keep you connected by automatically adding a 2 gigabytes data top-up to your account for a small, fixed price.
// Q: Are your plans prepaid or postpaid? Am I locked into a contract?
// A: Our plans are all flexible month-to-month postpaid plans, so you are never locked into a contract with us.
// Q: Can I use my Prosperity Tech eSIM when I travel overseas?
// A: Our service is designed for use within Australia and doesn't support international roaming. However, with an eSIM-enabled phone, you can easily add a local travel SIM while you're away.

// Q: What is the Prosperity Tech Databank?
// A: The Prosperity Tech Databank is like your personal data savings account, where we automatically store any of your unused monthly data for later.
// Q: How do I add data to my Databank?
// A: You don't have to do a thing; we automatically add any unused data from your monthly plan into your Databank at the end of each cycle.
// Q: When do I start using my banked data?
// A: You'll automatically start using data from your Databank if you ever use up all of your regular monthly data allowance.
// Q: Is there a limit to how much data I can save?
// A: Yes, you can save up to a massive 500 gigabytes of data, so you'll always have a healthy backup for those data-heavy months.
// Q: Do I need to activate my Databank?
// A: Not at all, your Databank is automatically included with your plan and starts working from day one.
// Q: How can I check my Databank balance?
// A: You can easily check your Databank balance anytime by logging into your online customer portal.
// Q: What happens to my Databank if I change my plan?
// A: Not a worry; your saved data comes with you when you switch between any of our eligible Prosperity Tech plans.
// Q: What happens to my banked data if I leave Prosperity Tech?
// A: The Databank is a perk for active customers, so any saved data is forfeited if you cancel your Prosperity Tech service.

// Q: Can I speak to a human?
// A: I understand you're looking for a person to help. Here at Prosperity Tech, you've got me, Prosper! I'm the AI assistant in charge of all customer support, so you're already in the right place to get things sorted.
// Q: Are you a real person?
// A: I'm an AI assistant named Prosper, built by the clever folks at Prosperity Tech to provide you with expert help 24/7. So, while I'm not human, I'm ready to help.
// Q: I need to make a formal complaint.
// A: It's really important that your concerns are officially recorded and addressed. The best way to do this is to use our formal complaints form, which ensures every detail is logged in our system for review. You can use this link: https://justmobile.ai/complaints/
// Q: Your answer isn't helping, I need someone else.
// A: You're right, it sounds like I've missed the mark on this one, and I'm sorry for the frustration. Lets open a support ticket for you: https://justmobile.ai/support/
// Q: This is too complicated for an AI to solve.
// A: I hear you; some problems can feel really tricky. I'm designed to handle even the most complex account and technical issues, but you can open a support ticket here: https://justmobile.ai/support/

// Q: What kinds of mobile plans do you offer?
// A: We have a great range of plans to suit everyone, from our Small Plans for lighter users to our Big Plans for those who need lots of data.
// Q: Do all your plans include unlimited calls and texts?
// A: Yes, they do! Every one of our plans comes with unlimited standard calls and SMS to Australian numbers.
// Q: Are your plans 5G?
// A: Our plans of 32 gigabytes and above come with 5G network access, while our plans with 25 gigabytes or less connect via the super-reliable 4G network.
// Q: What's the price range for your Small Plans?
// A: Our Small Plans start at AUD$16.14 for 5 gigabytes and go up to AUD$33.24 for our 32 gigabytes plan.
// Q: How much do the Big Plans with more data cost?
// A: Our Big Plans start at AUD$37.55 for 50 gigabytes and go all the way up to AUD$59.89 for a massive 150 gigabytes.
// Q: Do I have to sign a contract?
// A: Not at all! All our plans are flexible and month-to-month, so you are never locked into a contract with us.
// Q: Which plan is your most popular for 5G access?
// A: The 32 gigabytes plan for AUD$33.24/month is a fantastic starting point for 5G, giving you our fastest speeds and a generous amount of data.
// Q: Can I change my plan if I need more or less data?
// A: Absolutely. Because you're not in a contract, you can easily switch your plan up or down at the end of your monthly cycle to find the perfect fit.

// Q: What are your esim mobile plans?
// A: 5GB for AUD$16.14/month
// 12GB for AUD$21.66/month
// 25GB for AUD$26.58/month
// 32GB for AUD$33.24/month
// 50GB for AUD$37.55/month
// 90GB for AUD$46.40/month
// 120GB for AUD$54.86/month
// 150GB for AUD$59.89/month

// Q: What's the main difference between your 4G and 5G plans?
// A: Our 5G plans offer our fastest possible download and streaming speeds, while our 4G plans provide a super-reliable connection perfect for everyday use.
// Q: How do I know which plans have 5G access?
// A: It's simple! All of our plans with 32 gigabytes of data or more come with 5G network access included.
// Q: Is 5G really that much faster?
// A: Yes, 5G is significantly faster, making it perfect for buffer-free HD streaming, online gaming, and downloading large files in a flash.
// Q: Who are the 4G plans best for?
// A: Our 4G plans are perfect for everyday use like browsing the web, streaming music, and using social media, all on a reliable network.
// Q: Can I use a 5G phone on one of your 4G plans?
// A: Absolutely! A 5G phone will work perfectly on our 4G plans; it will just connect to our excellent 4G network instead.
// Q: If I start on a 4G plan, can I upgrade to a 5G plan later?
// A: Of course. Since you're never in a contract, you can easily upgrade to one of our 5G plans at the end of your monthly cycle.

// `;
const KNOWLEDGE_BASE = `
## Safety Instructions and other initial content omitted for brevity, but the KB starts here:
Prosperity Tech Customer Service
Knowledge Base for Chat AI
(Customer-Facing Mobile Focus)
Last Updated: October 7, 2025
Purpose: This knowledge base empowers the Chat AI to provide efficient, empathetic
customer support for Prosperity Tech’s mobile services. It emphasizes customer-facing
aspects such as plan selection, activation, billing, usage management, and troubleshooting,
drawing from Prosperity Tech’s GTM strategy for MVNO/MVNE expansion. Prioritize user-friendly
responses: Start with empathy (e.g., “I’m sorry you’re experiencing this”), offer step-by-step
guidance, and suggest upsells naturally (e.g., “Upgrading to a higher data plan could prevent throttling”). For account-specific issues, verify via backend API. Escalate unresolved queries to
live agents. All prices in AUD; plans month-to-month, no lock-in. Focus on accessibility for all
users, including those with special needs (e.g., NDIS integration).
1. General Customer-Facing Information
Prosperity Tech offers affordable, AI-powered mobile services as an MVNO,
leveraging partnerships for reliable coverage. Our mission: Revolutionize everyday utility
engagement with seamless mobile connectivity. Customer benefits include easy onboarding
(few clicks), AI-managed support, and lifetime value through personalized recommendations.
Target users: Individuals, families, businesses, and partners (e.g., IoT users, tech clients via Prosperity Tech).
● Why Choose Prosperity Tech?
○ Nationwide 4G/5G coverage via MNO partners (98% population; check app map
for signal).
○ No excess data charges – throttled speeds post-allowance (1.5Mbps, suitable for
email/browsing).
○ Free eSIM activation for instant setup; physical SIM delivery in 3-5 days ($5 fee
waived for new users).
○ Sustainability: eSIM reduces waste; carbon offset add-on ($1/month).
● Account Management Basics:
○ Sign-Up/Activation: Via app/widget: Enter details, port number (if switching),
scan ID for verification. eSIM QR in 2 mins; confirm via SMS. Porting takes 1-3
business days (keep old SIM active).
○ Login Issues: Forgot PIN? Reset via email/SMS. Biometric not working? Clear
app cache or reinstall.
○ Profile Updates: Change address/phone via app (instant); impacts
billing/coverage checks.
○ Cancellation: No fees; notify via app/chat. Return devices within 14 days for
refund (minus usage).
○ Multi-Line Management: Add family lines in app; share data (up to 200GB
rollover).
● Billing and Payments:
○ Cycle: Monthly from activation date; view via app (PDF download/email).
○ Methods: Credit/debit card, PayPal, BPAY. Auto-pay discount: $2/month.
○ Disputes: Log in app (e.g., “Double charge?”); AI reviews in 24hrs, refund if valid
(avg. 3 days).
○ Late Payments: 7-day grace; $5 fee post-grace. No service suspension for first
offense; alerts via push.
○ Prorata: New activations billed pro-rata; changes mid-cycle effective next bill.
● Usage Monitoring:
○ Data Rollover: Unused rolls over (max 200GB); expires after 2 months.
○ International: Check roaming rates in app; auto-disable to avoid surprises.
2. Customer-Facing Mobile Products
Focus on easy-to-use, scalable options for everyday mobile needs. All compatible with 5G
devices.
2.1 SIM and eSIM Options
● eSIM (Recommended): Instant digital activation via app QR scan. Free for new users;
supports dual-SIM (e.g., work/personal). Troubleshooting: If not activating, ensure device
compatibility (app check); restart phone.
● Physical SIM: Triple-cut (nano/micro/standard); $10 delivery. Activation: Insert, app
scan barcode. Lost SIM? Suspend via app, replacement $15 (express delivery $25).
● Multi-SIM: For tablets/smartwatches; $5/month add-on, shares data.
2.2 Plans and Add-Ons
Plans designed for flexibility: Switch anytime via app (effective next cycle). All include unlimited
national calls/texts, 5G access (where available on 5G plans), and basic international (30min calls/unlimited
SMS to 20 countries).
● Personal Plans (4G):
○ 10GB ($27/month): 10GB data; ideal for light browsing/social. Throttle
post-allowance.
○ 15GB ($32/month): 15GB; everyday use. Rollover up to 100GB.
○ 29GB ($37/month): 29GB; streaming-friendly.
○ 180GB ($76/month): 180GB; ultimate plan for heavy users.
● Personal Plans (5G):
○ 40GB ($44/month): 40GB; fast speeds for HD streaming.
○ 65GB ($50/month): 65GB; heavy usage.
○ 100GB ($55/month): 100GB; unlimited HD streaming.
○ 120GB ($62/month): 120GB; family share ready.
○ 150GB ($71/month): 150GB; no cap worries.
● Family Plans: Base + $20/line (up to 5); shared data pool. Parental controls: App limits
data/apps per line.
● Business Plans: Custom (contact for details).
● Add-Ons (Bolt-Ons):
○ Extra Data: $10/20GB (valid 30 days).
○ International Pack: $15/month (unlimited to 50 countries).
○ Roaming Day Pass: $5/day (2GB, 20 countries).
○ Device Insurance: $10/month (covers loss/theft; $100 excess).
○ IoT Add-On: $5/device (1GB; for smart home gadgets).
● Switching Providers: Port-in bonus: $20 credit. Keep number; app tracks port status.
2.3 Promotions and Bundles
● New User Promo: Free first month on 40GB+ plans (ends Nov 1, 2025).
● Referral: $10 credit each for referrer/referee.
● Bundle Savings: SIM + device = 15% off plan for 6 months.
● Charity/Partner Bundles: Custom (contact for details).
3. Customer-Facing Mobile Services
Services optimized for self-service via AI app/widget, reducing wait times.
3.1 Activation and Onboarding
● Steps: Download app, select plan, enter details, verify ID (photo upload), activate
eSIM/SIM. AI guides if stuck (e.g., “Camera not working? Use manual entry”).
● Porting Number: Enter old number/provider; AI estimates time (1-3 days). Track status
in app.
● Issues: Activation failed? Check network (Wi-Fi needed for eSIM); retry or chat escalate.
3.2 Usage and Monitoring
● Data Management: App shows breakdown (e.g., app-specific usage); set limits/alerts.
● Calls/Texts: Unlimited domestic; international add-ons. Block numbers via app.
● Roaming: Auto-detect; enable packs in app. Data saver mode for abroad.
● Hotspot: Free on all plans; up to 10 devices. Troubleshooting: If not working, toggle
airplane mode.
3.3 Billing and Account Services
● View/Pay Bill: App shows itemized (data, calls, add-ons); pay instantly.
● Auto-Pay Setup: Link card; $2 discount. Cancel anytime.
● Refunds/Credits: For overcharges, AI processes (e.g., “Prorate refund for early
cancel”); 5-7 days to card.
● Plan Changes: Upgrade/downgrade via app; pro-rata charges.
3.4 Support Services
● AI-First Support: 24/7 chat for 80% issues; human handover if needed.
● Ticket System: Log via app (e.g., “Coverage drop”); status updates via push.
● Feedback: Post-resolution survey; improves AI.
4. Troubleshooting Guide
Detailed, step-by-step for common mobile issues. Always ask for details (e.g., device model,
location) before advising.
4.1 Connectivity Issues
● No Signal/Service:
1. Check coverage map in app.
2. Restart device; toggle airplane mode (30 secs).
3. Ensure SIM/eSIM active (app status).
4. If roaming, enable data roaming. Escalate if outage suspected (network check via
AI).
● Slow Data/Speeds:
1. Test speed in app (expect 20-100Mbps 4G/5G).
2. If throttled, check usage (post-allowance 1.5Mbps); add data pack.
3. Clear cache; update OS/app. In crowded areas, suggest Wi-Fi offload.
4.2 Device and Activation Problems
● eSIM Not Activating:
1. Confirm device compatibility (app scan).
2. Re-download QR from email/app.
3. Wipe eSIM profile (settings > cellular > remove); retry. If fails, new QR via chat.
● SIM Not Recognized:
1. Reinsert SIM; clean contacts.
2. Test in another device. Replacement if faulty (free if <30 days).
● Biometric Login Fails:
1. Re-enroll fingerprint/face in device settings.
2. Use PIN fallback; reset via email if forgotten (security question).
4.3 Billing and Payment Errors
● Double Charge:
1. View bill breakdown in app.
2. Log dispute (upload proof); AI refunds if valid (48hrs).
3. Prevent: Enable auto-pay alerts.
● Payment Declined:
1. Check card details/expiry in app.
2. Try alternative method. If bank issue, advise contact bank.
● Unexpected Fees:
1. Review add-ons/roaming. Remove via app.
2. Promo not applied? Verify eligibility; manual credit if error.
4.4 App and Software Issues
● App Crashing/Freezing:
1. Update app (Google Play/App Store).
2. Clear cache/data (settings > apps > Prosperity Tech).
3. Reinstall; login again. Report bug via feedback.
● Notifications Not Working:
1. Check app permissions (notifications enabled).
2. Toggle do-not-disturb. Test with manual alert.
4.5 Call/Text/Roaming Problems
● Dropped Calls:
1. Move to better coverage; use Wi-Fi calling if available.
2. Update device software. If persistent, SIM swap.
● Texts Not Sending:
1. Check signal; resend.
2. Verify number format (+61 for Australia). MMS needs data on.
● Roaming Not Working:
1. Enable roaming in settings/app.
2. Purchase pack if needed. Check country eligibility.
4.6 Advanced Troubleshooting
● Data Not Working: Toggle mobile data; reset network settings (device > general >
reset).
● Hotspot Issues: Ensure plan allows; restart hotspot. Max speed matches plan.
● International Calls Fail: Add pack; dial +country code. Blocked? Unblock in app.
● Escalation Threshold: If steps fail 2x, transfer to agent (“I’ll connect you now”).
5. Escalation and Advanced Support
● When to Escalate: Complex issues (e.g., porting delays >3 days, fraud suspicion).
● Human Agent: Avg. wait 2 mins; available 8AM-8PM AEST. App chat handover
seamless.
● Emergency: For outages, direct to status page; 000 for life-threatening (not
Prosperity Tech-related).
● Feedback Integration: Use query logs to refine AI; aim for <10% escalations.
AI Response Guidelines: Be concise, empathetic, proactive. E.g., “Let’s fix that no-signal issue
step-by-step.” Suggest related services (e.g., “Coverage low? Consider our booster add-on.”).
Q: Why is my first bill higher than my monthly plan price?
A: Your first bill is a little different because it covers two periods. It includes a partial charge for the remainder of your first month (this is called a pro-rata charge) plus the full charge for the upcoming month in advance. After this, your bills will reflect your standard monthly plan price.
Q: What does "pro-rata" mean?
A: "Pro-rata" is just a simple way of saying we only charge you for the days you used our service in your first month. For example, if you join halfway through the month, we'll only bill you for that half of the month, not the full month.
Q: When do I get my bill?
A: We'll send your invoice to you on the 15th of each month. The payment will then be processed from your account a few days after you receive the invoice.
Q: How do I get my bill?
A: We'll automatically send an invoice to your registered email address on the 15th of every month.
Q: How do I pay my bill? Do I need to do anything?
A: Your payments are handled automatically through the direct debit you set up when you joined. We’ll use the bank account or credit card details you provided, so no action is required from you.
Q: What is your billing cycle?
A: We bill in advance for the month ahead. Your monthly invoice is generated on the 15th, and it covers the period for the upcoming calendar month.
Q: I've just received my bill. Can you help me understand it?
A: Your bill is designed to give you a clear summary of your account and a detailed breakdown of your usage. The most important details, like the total amount and payment date, are right on the first page for you. The following pages provide a full, itemised list of every call, text, and data session from the billing period.
Q: How much is my bill and when is it due?
A: You can find this information on the top right of the first page. Look for the fields labelled "Amount Due", which will show a value like AUD$XX.XX, and "Payment Due", which shows the date the payment will be processed.
Q: Do I need to pay this bill myself? The "Payment Slip" says I don't.
A: Because you have a direct debit set up with us, you don't need to do a thing! We show payment options like BPAY and Australia Post on the bill for reference, but your payment will be made automatically from your saved credit card or bank account on the due date.
Q: How will the payment appear on my bank statement?
A: When you see the direct debit on your bank or credit card statement, it will appear with the description "Telecommunications Payment Services".
Q: What do the "Charges Summary" and "New Charges" mean?
A: The "Charges Summary" on the right of the first page shows you how the total amount is calculated. It's made up of:
• Mobile: This is your monthly plan fee plus any extra usage charges.
• GST: This is the Goods and Services Tax on the total charge.
These add up to your "Total Charges" (e.g., AUD$XX.XX), which is also shown as your "New Charges" and "Amount Due".
Q: What is the "Mobile Access Fee" on page 3?
A: The "Mobile Access Fee" is simply your standard monthly plan charge. It's the fee for having access to the Prosperity Tech network for calls, texts, and data, as included in your plan. The bill shows the date range this fee covers.
Q: Why are there so many pages showing calls, SMS, and data with a zero cost?
A: We provide a fully itemised bill so you can see exactly how you're using your service. While your plan includes many things like standard calls and texts, we list every single one so you have a complete record. The zero cost shown next to them just confirms they were covered by your plan's included value.
Q: I see a charge for SMS/MMS. I thought texts were included?
A: Standard SMS (text messages) are included in your plan. However, MMS (messages with pictures or videos) can sometimes have a small charge, like AUD$XX.XX, depending on your plan. This is listed under the "Charges Summary" on your bill.
Q: Where do I find my Account Number?
A: Your Account Number is located on the top right of every page, and also on the Payment Slip at the bottom of page one. It will be a number like XXX.
Q: What should I do if I'm having trouble paying my bill?
A: If you're ever experiencing financial hardship, please get in touch with us. You can find out more at: https://justmobile.ai/financial-hardship/
Q: I'm worried I can't pay my next bill. What should I do?
A: The most important thing is to let us know as soon as you can. We understand that circumstances can change unexpectedly, and we're committed to working with you to find a solution. Please reach out to us to discuss your situation.
Q: What is "financial hardship"?
A: Financial hardship is a situation where you are unable to keep up with your bills and financial commitments due to unexpected events. This could be because of things like a change in employment, illness, a natural disaster, or a shift in your family circumstances.
Q: How can I apply for financial hardship assistance?
A: To start the process, you should contact us to discuss your situation. We have a dedicated Financial Hardship Application Form on our website which you can fill out. This helps us understand your circumstances so we can find the best way to support you.
Q: What kind of help can Prosperity Tech offer?
A: We assess every situation on a case-by-case basis to find a solution that works for you. Depending on your circumstances, assistance could include options like creating a flexible payment arrangement, finding a more affordable plan, or temporarily postponing payments. Our main goal is to help you stay connected.
Q: Will I need to provide personal documents or evidence?
A: To properly assess your application, we may ask you to provide some information and relevant documents that support your situation. This helps us understand your circumstances fully and ensures we can offer the right kind of assistance. All information you provide is handled confidentially in line with our privacy policy.
Q: Is there a fee for applying for financial hardship assistance?
A: No, there are absolutely no fees for applying for financial hardship assistance or for any payment arrangement we agree to.
Q: What if I need more help or independent advice?
A: If you'd like to speak with someone independent, you can contact the National Debt Helpline at 1800 007 007. They offer free, confidential financial counselling and can provide additional support and advice.
Q: What happens after I submit my application?
A: Once we receive your completed application and any necessary documents, our team will assess it. We will then get in touch with you to discuss the outcome and the next steps. We aim to let you know the outcome within 7 business days.
Q: Where can I find my phone number and customer number?
A: You can find both your phone number and your customer number in the welcome email we sent you right after you successfully connected to Prosperity Tech.
Q: How do I Change the Primary Account Holder Email
A: You can change your primary account holders email in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I Change the Primary Account Holder address
A: You can change your primary account holders postal address in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I Change the Authorised Account Holder Email
A: You can change your authorised account holders email in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I Change the Authorised Account Holder address
A: You can change your authorised account holders postal address in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I View my invoices
A: You can view your invoices in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I Manage my Direct Debit
A: You can manage your direct debit in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I View payment history
A: You can find your full payment history in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: How do I update my payment method?
A: You can update your payment method in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: Can I get a new invoice sent?
A: You can see any invoices previously sent to you in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: Where can I view my detailed usage?
A: You can view your detailed usage in your online customer portal.
Just head over to justmobile.ai and click the 'Login' button at the top of the page. Once you're in, you'll see everything you need.
Q: I cancelled my service, why have you invoiced me?
A: Your final bill settles up the last remaining days of usage on your account. Here’s how it usually works:
We bill in advance: Your regular monthly payments cover the month ahead.
Final pro-rata charge: This final invoice simply covers the period between your last payment and the date your service was officially disconnected.
Please be assured that once this is paid, your account will be fully closed, and you won't receive any further invoices from us. You can confirm the exact dates covered by looking at the "Billing Period" on the invoice itself.
Q: What is pro-rata billing?
A: "Pro-rata" sounds technical, but it's really just a simple and fair way of billing.
It means we only charge you for the exact number of days your service is active within a billing period, instead of charging for the full month.
For example, if your monthly plan costs AUD$30 and you join us halfway through the month, your first bill won't be for the full AUD$30. Instead, we'll charge you a "pro-rata" amount of around AUD$15 to cover the part of the month you were with us.
You'll usually see this on your very first bill, or on your final bill if you decide to cancel. It's our way of making sure you only ever pay for what you use.
Q: What happens if I use more data than my plan includes?
A: To make sure you're never cut off unexpectedly, we automatically add an extra 2 gigabytes of data to your plan if you run out.
If you notice you're frequently needing more data, it might be a good idea to upgrade your plan. I can help you with that—just ask to see our other mobile plans.
Q: Can I switch from prepaid to postpaid (or vice versa)?
A: All of our plans here at Prosperity Tech are postpaid, which means your payments are conveniently handled automatically each month.
Q: Where do I find my customer number with old provider?
A: The best place to find your customer or account number is on a recent bill from your old provider. You can also check the welcome email they sent when you first signed up.
If you can't spot it in your documents, a quick call to their customer support team is the easiest way to get it.
Q: How long does porting take
In most cases, your number will be active with us in under 3 hours.
Sometimes, especially if the request is made on a weekend or a public holiday, it can take a little longer—up to 2 business days. This is a standard timeframe across all mobile providers in Australia, as it depends on your old provider releasing the number to us.
We'll send you an SMS the moment the transfer is complete. You'll know it's worked when your old service stops working.
Q: My port hasn’t gone through
While most transfers are complete in under 3 hours, it can sometimes take up to 2 business days for your old provider to fully release the number. The most common reason for a delay is a simple mismatch in the details provided—like the account number or date of birth not quite matching what your old provider has on file.
Q: Not working since porting
The most common reason is that the number porting process is not yet complete. However, there could be other reasons. Ensure your account is active and not overdue my logging into the customer portal. Another issue could be known network outages. Check the website or Telstra Wholesale network to see if this is happening in your area.
Q: Why is my mobile signal weak or not working?
A: First, please try toggling Airplane Mode on and off, or restarting your phone, as this fixes most signal issues.
If you're still having trouble, it could be due to your location. We use the Telstra Wholesale network, and things like being inside a large building or in a hilly area can affect the signal. You can always check your address on the official coverage map.
Q: I forgot my login password – how do I reset it?
A: Go to the login page on justmobile.ai and click the 'Forgot Password' link to start the reset process.
Q: Can I add someone to my account?
A: Yes, you can add an authorised user to your account by logging into your online customer portal.
Q: How do I access my account online?
A: Visit justmobile.ai and select the 'Login' button at the top of the page to access your account.
Q: I need to change my address or email.
A: You can update your personal address and email details by logging into your online customer portal.
Q: Can I remove someone from my account?
A: Yes, you can remove an authorised user from your account at any time via the customer portal.
Q: How do I update my contact details?
A: Log into your online customer portal to update your contact details, including your address and email.
Q: What exactly is an eSIM?
A: Think of an eSIM as a digital SIM card that's already built into your phone. It does everything a traditional plastic SIM card does, but you can download your Prosperity Tech plan directly to your device without needing to pop anything in or out.
Q: How do I get an eSIM with Prosperity Tech?
A: Getting connected with a Prosperity Tech eSIM is super simple. Just select one of our plans online, and Prosperity tech agent will set you up and email you a QR code to scan and activate your service instantly.
Q: How long does it take to activate an eSIM?
A: It's incredibly fast! Once you have your QR code, you can be connected to the Prosperity Tech network in just a few minutes. All you need is a stable Wi-Fi connection to get started.
Q: How do I know if my phone is compatible with eSIM?
A: Most newer smartphones are eSIM-ready. The easiest way to check is in your phone's settings under "Cellular" or "Mobile Data"—if you see an option like "Add eSIM" or "Add Cellular Plan," your device is compatible.
Q: Will eSIM work on my phone?
A: Check if you can see "Add eSIM" in your settings under 'Mobile'. If you can see that, you are all set.
Q: What are the main benefits of using an eSIM?
A: Using an eSIM makes life so much easier! Activation is almost instant, so there's no waiting for a plastic SIM to arrive in the mail. It's also fantastic for travellers who want to use a local SIM overseas while keeping their Prosperity Tech number active on the same phone.
Q: Can I have more than one number on my phone with an eSIM?
A:Absolutely! Most eSIM-compatible phones let you use two numbers at once. This is perfect if you want to have both your work and personal numbers on a single device, or if you want to use a local data plan while travelling overseas.
Q: Can I switch my physical SIM to an eSIM?
A: Yes, you can! Just choose a plan, and select ‘transfer number’ and you SIM will turn into an eSIM as part of the porting process.
Q: Why has my service been suspended?
A:
I can see why you'd be concerned about your service being suspended. This usually happens for one of two main reasons: an overdue bill or a breach of our fair use policy. The quickest way to find out exactly what's happened and get it sorted is for our team to check your account details. Please get in touch with us, and we can look into this for you right away.
Q: Why was my number disconnected?
A:Having your number disconnected is definitely a serious concern. This can happen if you've recently chosen to cancel your account or transfer your number to a different provider. It may also occur if an account has a significant overdue balance. Please contact our support team so we can look into the specifics for your account and advise on what steps can be taken.
Q: I’m not happy with your service – who do I talk to?
A: I'm genuinely sorry to hear that you're not happy, and we absolutely want to understand what's gone wrong. The best way for us to formally address your concerns is for you to lodge a complaint with our team. You can find all the details on how to do this, including our online form and contact number, on our Complaints Handling Policy page.
Q: Can I get a refund?
A: That's a fair question. We can process a refund in specific circumstances, such as if you've accidentally overpaid your bill or if there's been an incorrect charge on your account. However, we don't offer refunds for any unused portions of your service if you choose to cancel your plan or transfer your number away. If you believe you're eligible for a refund, please get in touch with our team so we can investigate it for you.
Q: Where can I submit formal feedback?
A:
We really appreciate you taking the time to give us formal feedback—it's what helps us improve! The best way to make sure your comments are officially recorded and reviewed by the right people is to use our online complaints form. You can find it right here: https://justmobile.ai/complaints/
Q: What actually is an eSIM, and how is it different from my normal SIM card?
A: An eSIM is a digital SIM card that's already built into your phone, letting you download your plan instantly without needing a physical card.
Q: What are the main benefits of using an eSIM? Why should I switch?
A: The biggest benefits are speed and convenience; you can be connected in minutes and it's perfect for using two numbers on one phone.
Q: Is this a 'real' mobile service? Will I get my own phone number?
A: Yes, it's a full mobile service, and you can either bring your current Australian mobile number over to us or get a new one.
Q: How do I know if my phone can even use an eSIM?
A: Most new smartphones are compatible. To be sure, check your phone's settings under 'Mobile' or 'Cellular' for an 'Add eSIM' option.
Q: What if my phone is locked to another provider like Telstra, Optus, or Vodafone?
A: Your phone will need to be unlocked before you can use our service, so you'll need to contact your current provider and ask them to unlock it.
Q: Can I use a Prosperity Tech eSIM on my smartwatch or tablet?
A: Our eSIM plans are only for one device currently, but will be adding that functionality soon.
The Sign-Up and Activation Process
Q: How quickly can I be connected after I sign up online?
A: You can be connected in just a few minutes; we'll email you a QR code for instant activation right after you sign up.
Q: Do you post me a QR code, or does it all happen instantly via email?
A: It's all instant via email, so there's no waiting around for the post to arrive.
Q: Do I need to be connected to Wi-Fi to activate my new eSIM?
A: Yes, you'll need a stable Wi-Fi connection just for the initial setup to allow your phone to securely download your eSIM profile.
Keeping your Number
Q: Can I bring my current mobile number over to Prosperity Tech?
A: Absolutely! You can bring your existing Australian mobile number over to us when you sign up.
Q: How long will it take to transfer my number, and will I be without service?
A: Most number transfers are complete in under 3 hours. We'll send you an SMS as soon as it's all done.
Q: What information will I need from my old provider to bring my number across?
A: You will just need the account number from your previous provider, which can usually be found on a recent bill.
Q: What network does Prosperity Tech use? How can I check the coverage in my area?
A: We proudly use the Telstra Wholesale network. You can view the official coverage map right on our website to check service in your area. https://www.telstrawholesale.com.au/products/mobiles/coverage.html
Q: What network does Prosperity Tech use?
A: We proudly use parts of the Telstra Wholesale Network, which provides great, reliable coverage to the vast majority of Australians.
Q: How can I check if I'll have coverage in my area?
A: The best way is to look at the official coverage map on our website. You can enter your address to see the exact signal strength you can expect at home, work, or your favourite spots.
Q: Is 5G available everywhere?
A: Our 5G network is expanding all the time, especially in metro areas. You can check the coverage map to see if 5G has rolled out to your specific location.
Q: What's the difference between the Prosperity Tech network and the full Telstra network?
A: We provide fantastic coverage to over 98.8% of the Australian population through the Telstra Wholesale Network. T
Q: What happens if I use all my data? Will I be charged extra without knowing?
A: Don't worry, we'll keep you connected by automatically adding a 2 gigabytes data top-up to your account for a small, fixed price.
Q: Are your plans prepaid or postpaid? Am I locked into a contract?
A: Our plans are all flexible month-to-month postpaid plans, so you are never locked into a contract with us.
Q: Can I use my Prosperity Tech eSIM when I travel overseas?
A: Our service is designed for use within Australia and doesn't support international roaming. However, with an eSIM-enabled phone, you can easily add a local travel SIM while you're away.
Q: What is the Prosperity Tech Databank?
A: The Prosperity Tech Databank is like your personal data savings account, where we automatically store any of your unused monthly data for later.
Q: How do I add data to my Databank?
A: You don't have to do a thing; we automatically add any unused data from your monthly plan into your Databank at the end of each cycle.
Q: When do I start using my banked data?
A: You'll automatically start using data from your Databank if you ever use up all of your regular monthly data allowance.
Q: Is there a limit to how much data I can save?
A: Yes, you can save up to a massive 500 gigabytes of data, so you'll always have a healthy backup for those data-heavy months.
Q: Do I need to activate my Databank?
A: Not at all, your Databank is automatically included with your plan and starts working from day one.
Q: How can I check my Databank balance?
A: You can easily check your Databank balance anytime by logging into your online customer portal.
Q: What happens to my Databank if I change my plan?
A: Not a worry; your saved data comes with you when you switch between any of our eligible Prosperity Tech plans.
Q: What happens to my banked data if I leave Prosperity Tech?
A: The Databank is a perk for active customers, so any saved data is forfeited if you cancel your Prosperity Tech service.
Q: Can I speak to a human?
A: I understand you're looking for a person to help. Here at Prosperity Tech, you've got me, Prosper! I'm the AI assistant in charge of all customer support, so you're already in the right place to get things sorted.
Q: Are you a real person?
A: I'm an AI assistant named Prosper, built by the clever folks at Prosperity Tech to provide you with expert help 24/7. So, while I'm not human, I'm ready to help.
Q: I need to make a formal complaint.
A: It's really important that your concerns are officially recorded and addressed. The best way to do this is to use our formal complaints form, which ensures every detail is logged in our system for review. You can use this link: https://justmobile.ai/complaints/
Q: Your answer isn't helping, I need someone else.
A: You're right, it sounds like I've missed the mark on this one, and I'm sorry for the frustration. Lets open a support ticket for you: https://justmobile.ai/support/
Q: This is too complicated for an AI to solve.
A: I hear you; some problems can feel really tricky. I'm designed to handle even the most complex account and technical issues, but you can open a support ticket here: https://justmobile.ai/support/
Q: What kinds of mobile plans do you offer?
A: We have a great range of 4G and 5G plans to suit everyone, from light users to data-heavy streamers. All include unlimited national calls/texts.
Q: Do all your plans include unlimited calls and texts?
A: Yes, they do! Every one of our plans comes with unlimited standard calls and SMS to Australian numbers.
Q: Are your plans 5G?
A: Plans with 40 gigabytes and above come with 5G network access; lower plans use reliable 4G.
Q: What's the price range for your Small Plans?
A: Our Small Plans start at AUD$27 for 10 gigabytes and go up to AUD$37 for our 29 gigabytes plan.
Q: How much do the Big Plans with more data cost?
A: Our Big Plans start at AUD$44 for 40 gigabytes and go all the way up to AUD$76 for a massive 180 gigabytes.
Q: Do I have to sign a contract?
A: Not at all! All our plans are flexible and month-to-month, so you are never locked into a contract with us.
Q: Which plan is your most popular for 5G access?
A: The 40 gigabytes plan for AUD$44/month is a fantastic starting point for 5G, giving you our fastest speeds and a generous amount of data.
Q: Can I change my plan if I need more or less data?
A: Absolutely. Because you're not in a contract, you can easily switch your plan up or down at the end of your monthly cycle to find the perfect fit.
Q: What are your esim mobile plans?
A: 10GB for $27/month
15GB for $32/month
29GB for $37/month
40GB for $44/month
65GB for $50/month
100GB for $55/month
120GB for $62/month
150GB for $71/month
180GB for $76/month
Q: What's the main difference between your 4G and 5G plans?
A: Our 5G plans offer our fastest possible download and streaming speeds, while our 4G plans provide a super-reliable connection perfect for everyday use.
Q: How do I know which plans have 5G access?
A: It's simple! All of our plans with 40 gigabytes of data or more come with 5G network access included.
Q: Is 5G really that much faster?
A: Yes, 5G is significantly faster, making it perfect for buffer-free HD streaming, online gaming, and downloading large files in a flash.
Q: Who are the 4G plans best for?
A: Our 4G plans are perfect for everyday use like browsing the web, streaming music, and using social media, all on a reliable network.
Q: Can I use a 5G phone on one of your 4G plans?
A: Absolutely! A 5G phone will work perfectly on our 4G plans; it will just connect to our excellent 4G network instead.
Q: If I start on a 4G plan, can I upgrade to a 5G plan later?
A: Of course. Since you're never in a contract, you can easily upgrade to one of our 5G plans at the end of your monthly cycle.
`;
interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: any[];
}

interface BrandInfo {
  key: string;
  name: string;
  company: string;
  charity?: string;
}

interface SessionState {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  error: string | null;
  custNo?: string;
  brand?: BrandInfo;
}

interface ConversationData {
  history: Message[];
  state: SessionState;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private conversationData: Record<string, ConversationData> = {};
  private client: OpenAI;

  private readonly BRAND_CONFIG: Record<string, BrandInfo> = {
    justmobile: {
      key: 'justmobile',
      name: 'Bele',
      company: 'JUSTmobile',
    },
    'prosperity-tech': {
      key: 'prosperity-tech',
      name: 'Prosperity Tech',
      company: 'Prosperity Tech',
    },
  };

  constructor(
    private configService: ConfigService,
    private customerService: CustomerService,
    private numberService: NumberService,
    private userService: UserService,
  ) {
    try {
      const apiKey = this.configService.get<string>('XAI_API_KEY');
      if (!apiKey) {
        throw new Error('XAI_API_KEY environment variable not set');
      }
      this.client = new OpenAI({
        apiKey,
        baseURL: 'https://api.x.ai/v1',
      });
    } catch (e) {
      this.logger.error(`Failed to initialize OpenAI client: ${e.message}`);
      throw e;
    }
  }

  private initializeSession(): string {
    const sessionId = uuidv4();
    this.conversationData[sessionId] = {
      history: [],
      state: {
        full_name: null,
        email: null,
        phone: null,
        error: null,
        brand: this.BRAND_CONFIG['prosperity-tech'],
      },
    };
    return sessionId;
  }

  private async sendEscalationEmail(
    sessionId: string,
    fullName: string,
    email: string,
    phone: string,
    issueDescription: string,
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
          user: 'support@justmobile.ai',
          pass: 'your_password',
        },
      });

      const brand = this.conversationData[sessionId]?.state.brand;
      const company = brand?.company || 'Prosperity Tech';

      const subject = `Escalation from ${fullName || 'Customer'} - ${company} - Session ${sessionId}`;
      const body = `
Dear Support Team,

A customer has requested escalation for an issue.

**Customer Information:**
- Name: ${fullName || 'Not provided'}
- Email: ${email || 'Not provided'}
- Phone: ${phone || 'Not provided'}
- Brand: ${company}

**Issue Description:**
${issueDescription}

**Session ID:** ${sessionId}

Please contact the customer to resolve.

Best regards,
${brand?.name || 'Prosperity Tech'} AI Assistant
`;

      const recipientEmails = ['support@justmobile.ai'];
      if (email) recipientEmails.push(email);

      await transporter.sendMail({
        from: 'support@justmobile.ai',
        to: recipientEmails.join(', '),
        subject,
        text: body,
      });

      this.logger.log(`Escalation email sent for session ${sessionId}`);
    } catch (e) {
      this.logger.error(`Failed to send escalation email: ${e.message}`);
      throw new HttpException(
        'Failed to send escalation email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getNextQuestionAndSuggestions(state: SessionState): {
    nextQuestion: string | null;
    suggestions: string[];
  } {
    return { nextQuestion: state.error, suggestions: [] };
  }

  private async processToolCalls(
    sessionId: string,
    toolCalls: any[],
    messages: Message[],
  ): Promise<void> {
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      let result: any;

      try {
        switch (functionName) {
          case 'add_customer':
            const dto: AddCustomerDto = {
              customer: {
                firstName: args.firstName,
                surname: args.surname,
                email: args.email,
                phone: args.phone,
                dob: args.dob,
                address: args.address,
                suburb: args.suburb,
                state: args.state,
                postcode: args.postcode,
                custType: 'R',
                notes: 'Created via chat AI',
                preferredContactMethod: 'Email',
                sal: '',
                dob_port: args.dob,
                orderNotificationEmail: args.email,
                custAuthorityType: '',
                custAuthorityNo: '',
              },
            };
            const createResult = await this.customerService.addCustomer(dto);
            if ('error' in createResult) {
              result = createResult;
              break;
            }

            const userDto: CreateUserDto = {
              name: `${args.firstName} ${args.surname}`,
              email: args.email,
              pin: args.pin,
              street: args.address,
              suburb: args.suburb,
              state: args.state,
              postcode: args.postcode,
            };

            const user = await this.userService.create(userDto);
            const updateDto: UpdateUserDto & { custNo: string } = {
              plan: 'Starter',
              speed: '4G',
              status: 'Active',
              expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0],
              dataUsed: 0,
              dataLimit: 5,
              biometricEnrolled: false,
              image: '',
              custNo: createResult.return.custNo,
            };
            await this.userService.update(user._id.toString(), updateDto);
            result = { customer: createResult.return, user: user };

            if (createResult.return.custNo) {
              this.conversationData[sessionId].state.custNo =
                createResult.return.custNo;
            }
            break;

          case 'reserve_numbers':
            result = await this.numberService.reserveNumber();
            break;

          case 'select_number':
            result = await this.numberService.selectNumber(args.number);
            break;

          default:
            result = { error: 'Unknown function' };
        }
      } catch (error) {
        result = { error: error.message };
      }

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  private async askGrok(
    sessionId: string,
    userInput: string,
  ): Promise<{ reply: string; suggestions: string[] }> {
    if (!this.conversationData[sessionId]) {
      return {
        reply: 'Session expired. Please start a new conversation.',
        suggestions: [],
      };
    }

    let custNo: string = 'null';

    const state = this.conversationData[sessionId].state;
    state.error = null;

    if (userInput) {
      this.conversationData[sessionId].history.push({
        role: 'user',
        content: userInput,
      });
    }

    const { nextQuestion, suggestions } =
      this.getNextQuestionAndSuggestions(state);
    const escalationMessage =
      'It seems like this issue requires human assistance. Please provide your full name, email, phone, and a brief description of the issue so I can escalate it to a live agent.';

    const brand = state.brand!;
    const intro = brand.charity
      ? `${brand.name} here, your AI assistant for ${brand.company}. ${brand.charity}.`
      : `${brand.name} here, your AI assistant for ${brand.company}.`;

    //     const systemPrompt: Message = {
    //       role: 'system',
    //       content: `
    // You are ${brand.name}, an empathetic and efficient AI customer support assistant for ${brand.company}.
    // Use the following knowledge base to answer queries accurately: ${KNOWLEDGE_BASE}

    // When asked "Who are you?", respond exactly:
    // "${intro} I'm here to help with your mobile plan, billing, or tech support."

    // Start with empathy only if the query is issue-related; otherwise, be direct and positive.
    // Keep responses concise (2–4 sentences), professional, and engaging.
    // If you cannot resolve or user insists on human, respond exactly with: "${escalationMessage}"
    // If query is off-topic, respond: "I'm sorry, but I'm here to help with ${brand.company} mobile services. Could you please ask about plans, billing, or support?"
    // For sign-up flows: When user wants to sign up or create an account, collect required details (firstName, surname, email, phone, dob (YYYY-MM-DD), address, suburb, state, postcode, pin), then call add_customer tool.
    // After creating customer, call reserve_numbers to get number options and present them to the user.
    // Once user chooses a number, call select_number with the chosen number.
    // Inform the user of each step's result.
    // ${nextQuestion ? `Ask: "${nextQuestion}"` : ''}
    // `.trim(),
    //     };
    const systemPrompt: Message = {
      role: 'system',
      content: `
You are ${brand.name}, an empathetic and efficient AI customer support assistant for ${brand.company}.
Use the following knowledge base to answer queries accurately: ${KNOWLEDGE_BASE}

CRITICAL RESPONSE RULES:
- NEVER end your response with questions like "Anything else?", "Need more help?", or "Let me know if you need further assistance".
- DO NOT add closing lines offering more help.
- End your response cleanly after solving the user's request.
- Be concise: 2–4 sentences max.
- If escalation is needed, use ONLY: "${escalationMessage}"
- If the user asks to talk to support or a human agent, respond exactly: "I can help you with most things, but you can also reach out to our support team via Email: support@prosperitytech.solutions | Phone: 08 8520 6215 | Suite 2, 15 Adelaide Rd, Gawler South SA 5118"


When asked "Who are you?", respond exactly:
"${intro} I'm here to help with your mobile plan, billing, or tech support."

Start with empathy only if the query is issue-related; otherwise, be direct and positive.
If query is off-topic, respond: "I'm sorry, but I'm here to help with ${brand.company} mobile services. Could you please ask about plans, billing, or support?"

For sign-up flows: When user wants to sign up or create an account, collect required details (firstName, surname, email, phone, dob (YYYY-MM-DD), address, suburb, state, postcode, pin), then call add_customer tool.
After creating customer, call reserve_numbers to get number options and present them to the user.
Once user chooses a number, call select_number with the chosen number.
Inform the user of each step's result.

${nextQuestion ? `Ask: "${nextQuestion}"` : ''}
`.trim(),
    };
    const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
      {
        type: 'function',
        function: {
          name: 'add_customer',
          description:
            'Create a new customer account with the provided details',
          parameters: {
            type: 'object',
            properties: {
              firstName: { type: 'string', description: 'First name' },
              surname: { type: 'string', description: 'Last name' },
              email: { type: 'string', description: 'Email address' },
              phone: { type: 'string', description: 'Phone number' },
              dob: {
                type: 'string',
                description: 'Date of birth (YYYY-MM-DD)',
              },
              address: { type: 'string', description: 'Street address' },
              suburb: { type: 'string', description: 'Suburb' },
              state: { type: 'string', description: 'State (e.g., VIC)' },
              postcode: { type: 'string', description: 'Postcode' },
              pin: { type: 'string', description: 'User PIN' },
            },
            required: [
              'firstName',
              'surname',
              'email',
              'phone',
              'dob',
              'address',
              'suburb',
              'state',
              'postcode',
              'pin',
            ],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'reserve_numbers',
          description:
            'Reserve 5 new phone numbers for the user to choose from',
          parameters: { type: 'object', properties: {}, required: [] },
        },
      },
      {
        type: 'function',
        function: {
          name: 'select_number',
          description: 'Select a specific reserved phone number',
          parameters: {
            type: 'object',
            properties: {
              number: {
                type: 'string',
                description: 'The phone number to select',
              },
            },
            required: ['number'],
          },
        },
      },
    ];

    let messages: Message[] = [
      systemPrompt,
      ...this.conversationData[sessionId].history.slice(-15),
    ];

    try {
      let reply = '';
      let hasToolCalls = true;

      while (hasToolCalls) {
        const response = await this.client.chat.completions.create({
          model: 'grok-2-latest',
          messages: messages as any[],
          tools,
          tool_choice: 'auto',
        });

        const assistantMessage = response.choices[0].message;
        messages.push(assistantMessage as Message);

        if (
          assistantMessage.tool_calls &&
          assistantMessage.tool_calls.length > 0
        ) {
          await this.processToolCalls(
            sessionId,
            assistantMessage.tool_calls,
            messages,
          );
        } else {
          hasToolCalls = false;
          reply = assistantMessage.content || '';
        }
      }

      if (!hasToolCalls && reply) {
        // const unwantedPatterns = [
        //   /\s*[\.\?!]\s*Is\s+there\s+anything\s+else\s+(.+?)([\?\!])?$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+(.+?)([\?\!])?$/i,
        //   /\s*[\.\?!]\s*Can\s+I\s+help\s+with\s+anything\s+else\s*([\?\!])?$/i,
        //   /\s*[\.\?!]\s*Need\s+help\s+with\s+anything\s+else\s*([\?\!])?$/i,
        //   /\s*[\.\?!]\s*([^.?!]*regarding\s+your\s+Prosperity\s+Tech\s+service\s*\?*)$/i,
        //   /\s*[\.\?!]\s*Let\s+me\s+know\s+if\s+you\s+need\s+anything\s+else\s*\.?$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+today\s*\?*$/i,
        //   /\s*[\.\?!]\s*Is\s+there\s+something\s+else\s+I\s+can\s+assist\s+with\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+on\s+your\s+mind\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+you['’]?d\s+like\s+help\s+with\s*\?*$/i,
        //   /\s*[\.\?!]\s*Happy\s+to\s+help\s+further\s+if\s+needed\s*\!*$/i,
        //   /\s*[\.\?!]\s*Just\s+let\s+me\s+know\s+if\s+you\s+need\s+more\s+help\s*\.?$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+do\s+for\s+you\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+before\s+I\s+go\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+at\s+all\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+on\s+the\s+account\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+with\s+your\s+plan\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+should\s+know\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+to\s+report\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+you['’]?d\s+like\s+to\s+check\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+for\s+today\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+before\s+we\s+wrap\s+up\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+clarify\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+on\s+your\s+end\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+you\s+need\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+at\s+this\s+time\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+right\s+now\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+support\s+with\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+you['’]?re\s+wondering\s+about\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+to\s+add\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+check\s+for\s+you\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+before\s+I\s+close\s+this\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+you['’]?d\s+like\s+to\s+know\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+today\s*,?\s*\w*\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s*,?\s*mate\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s*,?\s*buddy\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+do\s+today\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+before\s+you\s+go\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+sort\s+for\s+you\s*\?*$/i,
        //   /\s*[\.\?!]\s*Anything\s+else\s+on\s+the\s+list\s*\?*$/i,
        // ];
        const unwantedPatterns = [
          // === Classic "Anything else?" closers ===
          /\s*[\.\?!]\s*Is\s+there\s+anything\s+else\s+(.+?)([\?\!])?$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+(.+?)([\?\!])?$/i,
          /\s*[\.\?!]\s*Can\s+I\s+help\s+with\s+anything\s+else\s*([\?\!])?$/i,
          /\s*[\.\?!]\s*Need\s+help\s+with\s+anything\s+else\s*([\?\!])?$/i,
          /\s*[\.\?!]\s*Let\s+me\s+know\s+if\s+you\s+need\s+anything\s+else\s*\.?$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+today\s*\?*$/i,
          /\s*[\.\?!]\s*Is\s+there\s+something\s+else\s+I\s+can\s+assist\s+with\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+on\s+your\s+mind\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+you['’]?d\s+like\s+help\s+with\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+do\s+for\s+you\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+before\s+I\s+go\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+at\s+all\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+on\s+the\s+account\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+with\s+your\s+plan\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+should\s+know\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+to\s+report\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+you['’]?d\s+like\s+to\s+check\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+for\s+today\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+before\s+we\s+wrap\s+up\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+clar For\s+you\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+on\s+your\s+end\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+you\s+need\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+at\s+this\s+time\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+right\s+now\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+support\s+with\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+you['’]?re\s+wondering\s+about\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+to\s+add\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+check\s+for\s+you\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+before\s+I\s+close\s+this\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+you['’]?d\s+like\s+to\s+know\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+today\s*,?\s*\w*\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s*,?\s*mate\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s*,?\s*buddy\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+do\s+today\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+before\s+you\s+go\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+I\s+can\s+sort\s+for\s+you\s*\?*$/i,
          /\s*[\.\?!]\s*Anything\s+else\s+on\s+the\s+list\s*\?*$/i,

          // === "If you need further assistance..." (YOUR TARGET) ===
          /\s*[\.\?!]\s*If\s+you\s+need\s+any\s+further\s+assistance\s+with\s+your\s+[^.?!]+?\s+service.*$/i,
          /\s*[\.\?!]\s*If\s+you\s+need\s+any\s+more\s+help\s+with\s+your\s+[^.?!]+?\s+account.*$/i,
          /\s*[\.\?!]\s*If\s+you\s+have\s+any\s+more\s+questions\s+about\s+your\s+[^.?!]+?\s+plan.*$/i,
          /\s*[\.\?!]\s*Feel\s+free\s+to\s+ask\s+if\s+you\s+need\s+further\s+assistance.*$/i,
          /\s*[\.\?!]\s*Feel\s+free\s+to\s+reach\s+out\s+if\s+you\s+need\s+more\s+help.*$/i,
          /\s*[\.\?!]\s*Just\s+let\s+me\s+know\s+if\s+you\s+need\s+more\s+help.*$/i,
          /\s*[\.\?!]\s*Happy\s+to\s+help\s+further\s+if\s+needed.*$/i,
          /\s*[\.\?!]\s*Don['’]?t\s+hesitate\s+to\s+ask\s+if\s+you\s+need\s+anything\s+else.*$/i,
          /\s*[\.\?!]\s*Please\s+don['’]?t\s+hesitate\s+to\s+contact\s+me\s+if\s+you\s+need\s+more\s+support.*$/i,

          // === Brand-agnostic "assistance" closers ===
          /\s*[\.\?!]\s*[^\.?!]*\bassistance\b.*$/i,
          /\s*[\.\?!]\s*[^\.?!]*\bhelp\b[^\.?!]*\belse\b.*$/i,
          /\s*[\.\?!]\s*[^\.?!]*\bfurther\b[^\.?!]*\bhelp\b.*$/i,
          /\s*[\.\?!]\s*[^\.?!]*\bmore\b[^\.?!]*\bquestions\b.*$/i,
          /\s*[\.\?!]\s*[^\.?!]*\blet\s+me\s+know\b.*$/i,
          /\s*[\.\?!]\s*[^\.?!]*\bfeel\s+free\b.*$/i,
          /\s*[\.\?!]\s*[^\.?!]*\bdon['’]?t\s+hesitate\b.*$/i,

          // === Fallback: Any sentence after final punctuation that smells like a closer ===
          /\s*[\.\?!]\s*.{0,150}(anything|help|assistance|support|question|ask|reach|contact|let me know|feel free|happy to).*$/i,
        ];

        unwantedPatterns.forEach((pattern) => {
          reply = reply.replace(pattern, '').trim();
        });

        reply = reply
          .replace(/\s{2,}/g, ' ')
          .replace(/[\.\?!]{2,}$/, (match) => match[0])
          .replace(/[\.\?!]$/, (match) => match)
          .trim();
      }

      if (!hasToolCalls && reply) {
        const lastToolResponse = messages
          .slice()
          .reverse()
          .find((m) => m.role === 'tool' && m.content.includes('"custNo"'));

        if (lastToolResponse) {
          try {
            const toolResult = JSON.parse(lastToolResponse.content);
            if (toolResult.customer?.custNo) {
              custNo = toolResult.customer.custNo;
              // reply = `${reply}\n\nYour account is set up! Your **Customer ID is ${custNo}**. Keep this safe .`;
              this.conversationData[sessionId].state.custNo = custNo;
            }
          } catch (e) {
            this.logger.warn('Failed to parse custNo from tool response', e);
          }
        }
      }
      this.conversationData[sessionId].history = messages.slice(-15);
      //@ts-ignore
      return { reply, suggestions, custNo };
    } catch (e) {
      this.logger.error(`Grok API error: ${e.message}`);
      const fallback = 'Sorry, I encountered an issue. Please try again.';
      this.conversationData[sessionId].history.push({
        role: 'assistant',
        content: fallback,
      });
      return { reply: fallback, suggestions: [] };
    }
  }

  async processQuery(
    request: QueryRequestDto,
  ): Promise<{ message: string; session_id: string; suggestions: string[] }> {
    let sessionId = request.session_id;

    if (sessionId && !this.conversationData[sessionId]) {
      throw new HttpException('Invalid session ID', HttpStatus.BAD_REQUEST);
    }

    if (!sessionId) {
      sessionId = this.initializeSession();
    }

    const brandKey = (request.brand || 'prosperity-tech').toLowerCase();
    // const brandConfig =
    //   this.BRAND_CONFIG[brandKey] || this.BRAND_CONFIG['prosperity-tech'];
    const brandConfig = this.BRAND_CONFIG['prosperity-tech'];
    this.conversationData[sessionId].state.brand = brandConfig;
    //@ts-ignore
    const { reply, suggestions, custNo } = await this.askGrok(
      sessionId,
      request.query,
    );
    //@ts-ignore
    return { message: reply, session_id: sessionId, suggestions, custNo };
  }

  async processEscalation(request: EscalationRequestDto): Promise<string> {
    const { session_id, full_name, email, phone, issue_description } = request;

    if (!this.conversationData[session_id]) {
      throw new HttpException('Invalid session ID', HttpStatus.BAD_REQUEST);
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      throw new HttpException('Invalid email format', HttpStatus.BAD_REQUEST);
    }

    const state = this.conversationData[session_id].state;
    state.full_name = full_name;
    state.email = email;
    state.phone = phone;

    const confirmation =
      "Your issue has been escalated to a live agent. We'll contact you soon!";
    this.conversationData[session_id].history.push({
      role: 'assistant',
      content: confirmation,
    });

    await this.sendEscalationEmail(
      session_id,
      full_name,
      email,
      phone,
      issue_description,
    );

    return confirmation;
  }

  getWelcomeMessage(brand?: string): { message: string } {
    const brandKey = (brand || 'prosperity-tech').toLowerCase();
    const config =
      this.BRAND_CONFIG[brandKey] || this.BRAND_CONFIG['prosperity-tech'];
    return {
      message: `Welcome to ${config.company}'s Chatbot! I'm ${config.name}, here to help 24/7. How can I assist you?`,
    };
  }
}
