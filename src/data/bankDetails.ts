import { BankAccount } from '../types';

export const ETHIOPIAN_BANK_ACCOUNTS: BankAccount[] = [
  {
    bankName: 'Telebirr',
    accountName: 'Fraol Abera Travel Agency',
    accountNumber: '+251 92 174 1429',
    color: 'from-blue-600 to-sky-500',
    iconName: 'Smartphone',
    instructions: 'Send money via Telebirr SuperApp or USSD *127# to phone number +251 92 174 1429. Include your Inquiry Ticket # in the note.'
  },
  {
    bankName: 'Commercial Bank of Ethiopia (CBE)',
    accountName: 'Fraol Abera Travel Agency',
    accountNumber: '1000 4567 8901 2',
    color: 'from-purple-800 to-purple-600',
    iconName: 'Building2',
    instructions: 'Transfer via CBE Birr, CBE Mobile Banking, or branch deposit to account 1000 4567 8901 2.'
  },
  {
    bankName: 'CBE Birr',
    accountName: 'Fraol Abera Travel Agency',
    accountNumber: '0921741429',
    color: 'from-purple-900 to-indigo-700',
    iconName: 'Send',
    instructions: 'Pay directly via CBE Birr shortcode or phone transfer to 0921741429.'
  },
  {
    bankName: 'Bank of Abyssinia (BOA)',
    accountName: 'Fraol Abera Travel Agency',
    accountNumber: '8876 5432 1098',
    color: 'from-amber-600 to-yellow-500',
    iconName: 'Building',
    instructions: 'Transfer via Abyssinia Mobile App or branch deposit.'
  },
  {
    bankName: 'Dashen Bank',
    accountName: 'Fraol Abera Travel Agency',
    accountNumber: '0123 4567 8900 1',
    color: 'from-blue-800 to-indigo-900',
    iconName: 'CreditCard',
    instructions: 'Transfer via Amole or Dashen Bank mobile app.'
  },
  {
    bankName: 'Awash Bank',
    accountName: 'Fraol Abera Travel Agency',
    accountNumber: '0132 0987 6543 00',
    color: 'from-emerald-700 to-teal-600',
    iconName: 'ShieldCheck',
    instructions: 'Transfer via Awash Birr / Awash Mobile App.'
  }
];
