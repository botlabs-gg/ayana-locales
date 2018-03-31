# Ayana Localization Instructions
> If you wish to contribute please be sure to read and follow the below instructions

## Weblate
Ayana uses crowd source user translations. To help manage that we use Weblate. A nice
piece of software that takes the headache out of translations for both sides.
It has a small learning curve. But once you learn it we think you will enjoy it.

First you should join the [Ayana support server](https://ayana.io/support)
and tell someone from the staff (Support and upwards) you want to translate.
Further instruction will be given afterwards.

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

Some exceptions are:

1. Command names (stuff like "`support` command for invite" or "`settings guild dmerrors false`"). Don't translate the actual command into your language.
2. Command arguments that are exactly written for the command to work (stuff like "`=m r <on|one|off>`"). Don't translate those into your language.

Remember to **not** translate any of the following
1. `{{variable}}`
2. `:emojiname:`


Please work hard to make your output feel and function very similar to how the source
translation is setup.