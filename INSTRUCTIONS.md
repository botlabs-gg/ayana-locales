# Ayana Localization Instructions
> If you wish to contribute please be sure to read and follow the below instructions

## Weblate
Ayana uses crowd source user translations. To help manage that we use Weblate. A nice
piece of software that takes the headache out of translations for both sides.
It has a small learning curve. But once you learn it we think you will enjoy it.

Your first step to using weblate is to create an account. [Click here](https://weblate.ayana.io/accounts/register/)
to go to the form. After creating an account please make sure to join [Ayana support server](https://ayana.io/support)
and tell someone from support you have joined the team.

**WARNING YOU MUST TELL SUPPORT. NEW ACCOUNTS ONLY HAVE SUGGESTION RIGHTS. TELLING SUPPORT WILL GET YOUR ACCOUNT APPROVED TO SAVE TRANSLATIONS**

## Variables
Any string surrounded by `{{}}` is a variable. You **should not** translate anything
inside of these double brackets. They are replaced at runtime with the correct information.
You are free to move these around anywhere in your translation to make it make sense in
your locale.

## Formatting
There is a lot of formatting in these strings so things look pretty on Discord. Please
make sure to maintain these in your final translation. Here is a small list of some
of the stuff you may see
1. `**String to translate**`
2. `__String to translate__`
3. `` `String to translate` ``
4. `"String to translate"`
5. `'String to translate'`
6. `[String to translate]`
7. `<String to translate>`
8. `[String to translate](http://dont.translate/me)`

Remember to **not** translate any of the following
1. `{{variable}}`
2. `:emojiname:`


Please work hard to make your output feel and function very similar to how the source
translation is setup.

## Special Contexts
Always pay attention to the context of the term you are translating. Anything in
the `translation` or `metadata` contexts is a special term. Here is how to handle
them.

### `translation.nativeName`
This term should not be directly translated from the source translation. This translation
needs to reflect the Locale you are translating to in its native form. For example
if I was translating Japanese I would set `translation.nativeName` to `日本語`

### `translation.englishName`
This term should not be directly translated from the source translation. This translation
needs to reflect the Locale you are translating to in its english form. For example
if I was translating Japanese I would set `translation.englishName` to `Japanese`