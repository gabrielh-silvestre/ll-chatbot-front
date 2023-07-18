import type {
  BotStore,
  ChatLink,
  ChatOption,
  Message,
} from '../../../utils/types';

const GREETINGS = [/^hello/i, /good/i];
const LOAN = [/loan/i];
const ENDINGS = [/goodbye/i];
const DEMANDS = [/^i want/i];

const APPLY_LOAN_LINK_LIST: ChatLink[] = [
  {
    label: 'Wikipedia',
    href: 'https://en.wikipedia.org/wiki/Loan',
  },
  {
    label: 'Investopedia',
    href: 'https://www.investopedia.com/terms/l/loan.asp',
  },
  {
    label: 'NerdWallet',
    href: 'https://www.nerdwallet.com/article/loans/personal-loans/how-to-apply-for-a-loan',
  },
];

const LOAN_CONDITIONS_LINK_LIST: ChatLink[] = [
  {
    label: 'New American Funding',
    href: 'https://www.newamericanfunding.com/blog/the-conditions-behind-the-loan-approval/',
  },
  {
    label: 'Forbes',
    href: 'https://www.forbes.com/advisor/loans/what-are-loan-terms/',
  },
];

const LOAN_OPTIONS = (
  sendMessage: BotStore['sendBotMessage']
): ChatOption[] => [
  {
    label: 'Do you want to apply for a loan?',
    onClick: () =>
      sendMessage(
        'Check the follows options to understand more.',
        'linkList',
        APPLY_LOAN_LINK_LIST
      ),
  },
  {
    label: 'Loan conditions',
    onClick: () =>
      sendMessage(
        'Check the follows options to understand more.',
        'linkList',
        LOAN_CONDITIONS_LINK_LIST
      ),
  },
  {
    label: 'Help',
    onClick: () =>
      sendMessage('Check the follows links for more information.', 'linkList', [
        ...APPLY_LOAN_LINK_LIST,
        ...LOAN_CONDITIONS_LINK_LIST,
      ]),
  },
];

export const botActionProvider = (
  message: Message,
  sendMessage: BotStore['sendBotMessage']
) => {
  if (message.fromBot) return;

  const isCase = (regexs: RegExp[], text: string) =>
    regexs.some((regex) => regex.test(text));

  switch (true) {
    case isCase(GREETINGS, message.text):
      sendMessage(
        'Hello there! I am a bot and I am here to help you with loans.'
      );
      break;
    case isCase(LOAN, message.text):
      sendMessage(
        'I can help you with that.',
        'optionList',
        LOAN_OPTIONS(sendMessage)
      );
      break;
    case isCase(ENDINGS, message.text):
      sendMessage('Goodbye!');
      break;
    case isCase(DEMANDS, message.text):
      sendMessage('I will get back to you soon.');
      break;
    default:
      sendMessage(
        'Sorry, I did not understand that. To initiate a conversation, type "hello".'
      );
      break;
  }
};
