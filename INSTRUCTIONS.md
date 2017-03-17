# Ayana Localization Instructions
> If you wish to contribute please be sure to read and follow the below instructions

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