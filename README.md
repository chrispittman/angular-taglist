angular-taglist
===============

An Angular directive for editing lists of freeform tags.  Inspired by [xoxco's jQuery plugin](https://github.com/xoxco/jQuery-Tags-Input).

Instructions
------------

Download this github repo and include it in your code.  We're also available on bower (as 'angular-taglist').

Include 'angular_taglist_directive' as a dependency in your angular module.

Drop a `taglist` tag into your HTML:

    <taglist tag-data="my_tag_array"></taglist>

If you want more control over the `<input>` tag in the tag list (for example, to add form validation or to set placeholder text), include it in the `<taglist>`:

    <taglist tag-data="my_tag_array"><input ng-required="my_tag_array.length==0"/></taglist>

More examples [on Plunker](http://plnkr.co/edit/0vzZsn70SGQkIKKZoVEP?p=preview).

Versions
--------
* 0.0.x - initial versions
* 0.1.0 - rewrite & cleanup; all taglist attrs other than tag-data dropped in favor of giving direct access to the 'input' tag
