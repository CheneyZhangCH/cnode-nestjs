module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'chore',
      name: 'chore:    In case none of them suit for you',
    },
    { value: 'WIP', name: 'WIP:      Work in progress' },
  ],

  scopes: [
    { name: '新业务功能' },
    { name: '功能优化' },
    { name: 'QA bug fix' },
    { name: '基础框架' },
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: true,
  skipQuestions: ['breaking', 'footer'],
  subjectLimit: 100,
}
