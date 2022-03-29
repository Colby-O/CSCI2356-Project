# CSCI2356-Project

# Interface Software Requirements:

~[I-01] P2 shall operate in the Chrome browser.~
~[I-02] P2 shall communicate with the server using the http protocol.~
~[I-03] P2 shall include Node.js server software.~
~[I-04] P2 shall not include any database software.~

# Client-Side Software Requirements:

~[C-01] One square key on the keyboard shall be 50px by 50px.~
~[C-02] The space around each key (above, below, left, and right) shall be 25px.~
~[C-03] The font size for all text, including on the keys, is 2 times the default font size.~
~[C-04] The keyboard width must not go beyond 725px.~
[C-05] A full keyboard shall be implemented meaning !@#$%^&\*()-\_=+;:'"<>,.? and all the digits and all the uppercase and lowercase letters will be included.
~[C-06] Each key will expand to 2 times its dimensions when hovered.~
~[C-07] The keyboard shall initially display lowercase keys.~
[C-08] A space will automatically be inserted after a word in the wordbank.
~[C-09] A shift key shall be present.~
~[C-10] When the shift key is pressed, the whole keyboard will change to uppercase letters.~
~[C-11] Numeric and symbol keys may be organized so they are useable in one of the two uppercase or lowercase modes.~
~[C-12] Once a key is clicked, the effect of the shift key is terminated.~
~[C-13] A caps-lock toggle key shall be present.~
[C-14] The keyboard shall contain a word bank area.
[C-15] The client shall be able to enter a word or phrase into the word bank by typing it out.
[C-16] Every word or phrase in the word bank is visible to the user at the same time.
~[C-17] The colour scheme shall have a Montreal Canadians theme.~
~[C-18] P1 shall be modified so that each blog has a noneditable number rather than a name.~
~[C-19] P1 shall be modified so that when an edit toggle is clicked, all the Blog Number, Edit, and Publish columns disappear.~
~[C-20] When an edit toggle is clicked, the text entry area and keyboard shall appear.~
~[C-21] The text entry area shall be 8 lines tall.~
~[C-22] The text entry area shall be above the keyboard.~
~[C-23] The text entry area shall have a save button.~
~[C-24] The text entry area shall have a cancel button.~
~[C-25] The text entry area shall have a one-time undo button.~
~[C-26] When the save button [C-23] is clicked a first warning shall enable the user to cancel or continue.~
~[C-27] When the first warning's continue option [C-26] is selected, a second warning shall enable the user to cancel or continue.~
~[C-28] When the cancel button [C-24] is clicked a first warning shall enable the user to cancel or continue.~
~[C-29] When the first warning's continue option [C-28] is selected, a second warning shall enable the user to cancel or continue.~

# Server-Side Software Requirements:

~[S-01] The server shall maintain storage for each blog corresponding to [C-23].~
[S-02] The server shall maintain storage for the status of each publish toggle.
~[S-03] The blogs and publish buttons status shall be lost when the server program stops.~

# Particular Additions:

[P-01] Add indicator for what blog we are editing,
since the blogs, edits, and publish are supposed to disappear.
[P-02] Add blinking line to tell you what line you are currently editing
(currently disappears after you start typing).
[P-03] Allow editing of previous words. Currently when you select where you want to edit, it adds that change to the last word or space you typed, instead of where you wanted to edit.
