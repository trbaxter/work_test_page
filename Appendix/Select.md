# Useful Select Functions

- ### [Select All Columns](#select-all-columns)
- ### [Select File Column Number](#select-file-column-number)
- ### [Select JSON Key Value](#select-json-key-value)
- ### [Select JSON & Lateral Flatten](#select-json-lateral-flatten)

<br/> <br/>
<br/> <br/>
<br/> <br/>

## Select All Columns


<pre>

<span class="sf-blue">SELECT</span> * 
<span class="sf-blue">FROM</span> data_source

Selects all columns in a database object. 
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/select#label-select-cmd-syntax-all-columns">here</a>.

<span class="caution"><b>CAUTION</b>:</span> Using <span class="sf-blue">SELECT</span> * is generally considered bad practice.
         Avoid using it unless necessary, as it incurs greater costs.
</pre>

<br/> <br/>
<hr/>
<br/> <br/>

## Select File Column Number

<pre>

<span class="sf-blue">SELECT</span> $<span class="sf-green">1</span> $<span class="sf-green">2</span> $<span class="sf-green">...</span>
<span class="sf-blue">FROM</span> @[alias.]my_internal_stage
(FILE_FORMAT => database_name.schema_name.file_format_name)

Previews a specific file format type given the chosen columns in the <span class="sf-blue">SELECT</span> statement.
Documentation link <a href="https://docs.snowflake.com/en/user-guide/querying-stage">here</a>.
</pre>

<br/> <br/>
<hr/>
<br/> <br/>

## Select JSON Key Value

<pre>

<span class="sf-blue">SELECT</span> entity_name : key
<span class="sf-blue">FROM</span> table_name


Selects the value of a given key from a specified JSON entity.
Documentation link <a href="https://docs.snowflake.com/en/user-guide/querying-semistructured#dot-notation">here</a>.

<span class="note">NOTE:</span> The result of this query will still be in JSON form. 
</pre>

<br/> <br/>
<hr/>
<br/> <br/>

## Select JSON Lateral Flatten

<pre>

<span class="sf-blue">SELECT</span> value_1 : key_name, value_2 : key_name, ...
<span class="sf-blue">FROM</span> table_name
, <span class="sf-blue">LATERAL</span> <span class="sf-green">FLATTEN</span> (INPUT => entity_name : array_to_convert_to_row)


or


<span class="sf-blue">SELECT</span> value_1 : key_name, value_2 : key_name, ...
<span class="sf-blue">FROM</span> table_name
, <span class="sf-blue">TABLE </span>(<span class="sf-green">FLATTEN</span> (object_name : array_to_convert_to_row))


Extracts the values of the keys specified in the <span class="sf-blue">SELECT</span> clause. 
Results in a column for each key-value pair selected. Outputs are the same for both setups. 

Either version will turn the selected key-value pairs into a row from the JSON array they're extracted from.
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/constructs/join-lateral">here</a> and <a href="https://docs.snowflake.com/en/sql-reference/functions/flatten">here</a>.
</pre>

<br/>


<details> <summary>&nbsp; Example JSON:</summary>

<br/>

```json
{
  "title": "Book Title",
  "year_published": 2024,
  "authors": [
    {
      "first_name": "John",
      "last_name": "Doe"
    },
    {
      "first_name": "Jane",
      "last_name": "Smith"
    }
  ]
}
```
</details>

<br/>

<details>
<summary>&nbsp; Sample query:</summary>

<br/>

<pre>
<span class="sf-blue">SELECT</span> VALUE.first_name, VALUE.last_name  
<span class="sf-blue">FROM</span> nested_json  
, <span class="sf-blue">LATERAL</span> <span class="sf-green">FLATTEN</span> (INPUT => raw_nested_book : authors)
</pre>


</details>

<br/>

<details>
<summary>&nbsp; Result:</summary>

<br/>


<table>
    <tr>
        <th>&nbsp; first_name &nbsp;</th>
        <th>&nbsp; last_name &nbsp;</th>
    </tr>
    <tr>
        <td style="text-align: center">John</td>
        <td style="text-align: center">Doe</td>
    </tr>
    <tr>
        <td style="text-align: center">Jane</td>
        <td style="text-align: center">Smith</td>
    </tr>
</table>
</details>

<br/> <br/>
<hr/>
<br/> <br/>

<pre>
<span class="sf-blue">SELECT</span> object_name : outer_key : array_name[<span class="sf-green">#</span>] : inner_key
<span class="sf-blue">FROM</span> table_name
</pre>

<br/>

<details>
<summary>&nbsp; Example JSON:</summary>

```json
[
    {
      "created_at": "Thu Aug 22 00:46:55 +0000 2019",
      "id": 1164338122651590700,
      "id_str": "1164338122651590656",
      "text": "RT @DiscoverSelf: Selenium Trace Mineral to Your Body's Antioxidant Reserves #AMCoffee #HeartThis #HealthyLiving #Foods #Women #WomensHealt…",
      "truncated": false,
      "entities": {
        "hashtags": [
          {
            "text": "AMCoffee",
            "indices": [
              77,
              86
            ]
          },
          {
            "text": "HeartThis",
            "indices": [
              87,
              97
            ]
          },
          {
            "text": "HealthyLiving",
            "indices": [
              98,
              112
            ]
          },
          {
            "text": "Foods",
            "indices": [
              113,
              119
            ]
          },
          {
            "text": "Women",
            "indices": [
              120,
              126
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "DiscoverSelf",
            "name": "Celebrate Woman",
            "id": 24968293,
            "id_str": "24968293",
            "indices": [
              3,
              16
            ]
          }
        ],
        "urls": []
      },
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 82836976,
        "id_str": "82836976",
        "name": "Beck Valley Books",
        "screen_name": "beckvalleybooks",
        "location": "Billingham UK",
        "description": "Our blog is full of book / product reviews, news and giveaways as well as family news.  We love being part of the blogging community.",
        "url": "http://t.co/kB73uVDWrn",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "http://t.co/kB73uVDWrn",
                "expanded_url": "http://www.beckvalleybooks.blogspot.com",
                "display_url": "beckvalleybooks.blogspot.com",
                "indices": [
                  0,
                  22
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 17825,
        "friends_count": 7549,
        "listed_count": 684,
        "created_at": "Fri Oct 16 09:11:23 +0000 2009",
        "favourites_count": 959,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": true,
        "verified": false,
        "statuses_count": 144026,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "8B542B",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme8/bg.gif",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme8/bg.gif",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1087336744968732672/7OqvHSjm_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1087336744968732672/7OqvHSjm_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/82836976/1500735230",
        "profile_link_color": "9D582E",
        "profile_sidebar_border_color": "D9B17E",
        "profile_sidebar_fill_color": "EADEAA",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "created_at": "Wed Aug 21 12:53:05 +0000 2019",
        "id": 1164158480074363000,
        "id_str": "1164158480074362880",
        "text": "Selenium Trace Mineral to Your Body's Antioxidant Reserves #AMCoffee #HeartThis #HealthyLiving #Foods #Women… https://t.co/IV3OlsDPSS",
        "truncated": true,
        "entities": {
          "hashtags": [
            {
              "text": "AMCoffee",
              "indices": [
                59,
                68
              ]
            },
            {
              "text": "HeartThis",
              "indices": [
                69,
                79
              ]
            },
            {
              "text": "HealthyLiving",
              "indices": [
                80,
                94
              ]
            },
            {
              "text": "Foods",
              "indices": [
                95,
                101
              ]
            },
            {
              "text": "Women",
              "indices": [
                102,
                108
              ]
            }
          ],
          "symbols": [],
          "user_mentions": [],
          "urls": [
            {
              "url": "https://t.co/IV3OlsDPSS",
              "expanded_url": "https://twitter.com/i/web/status/1164158480074362880",
              "display_url": "twitter.com/i/web/status/1…",
              "indices": [
                110,
                133
              ]
            }
          ]
        },
        "metadata": {
          "iso_language_code": "en",
          "result_type": "recent"
        },
        "source": "<a href=\"http://app.sendblur.com\" rel=\"nofollow\">Social Media Publisher App </a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 24968293,
          "id_str": "24968293",
          "name": "Celebrate Woman",
          "screen_name": "DiscoverSelf",
          "location": "USA",
          "description": "Giving women moments to celebrate every day.  Follow Along #DisneyPartner #WomensHealth #SkinYouth #BreastCancerAwareness #RecipeIdeas",
          "url": "https://t.co/Gl6Kk22YvA",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "https://t.co/Gl6Kk22YvA",
                  "expanded_url": "http://www.CelebrateWomanToday.com",
                  "display_url": "CelebrateWomanToday.com",
                  "indices": [
                    0,
                    23
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 61705,
          "friends_count": 20053,
          "listed_count": 3277,
          "created_at": "Tue Mar 17 22:21:00 +0000 2009",
          "favourites_count": 23869,
          "utc_offset": null,
          "time_zone": null,
          "geo_enabled": false,
          "verified": false,
          "statuses_count": 527511,
          "lang": null,
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "000000",
          "profile_background_image_url": "http://abs.twimg.com/images/themes/theme7/bg.gif",
          "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme7/bg.gif",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/2794741186/3e9dbd6e0280be106dac91fd6d3ef775_normal.png",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/2794741186/3e9dbd6e0280be106dac91fd6d3ef775_normal.png",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/24968293/1552500605",
          "profile_link_color": "CC0066",
          "profile_sidebar_border_color": "055C94",
          "profile_sidebar_fill_color": "6FC1F6",
          "profile_text_color": "000000",
          "profile_use_background_image": true,
          "has_extended_profile": false,
          "default_profile": false,
          "default_profile_image": false,
          "following": false,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 2,
        "favorite_count": 2,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "en"
      },
      "is_quote_status": false,
      "retweet_count": 2,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    {
      "created_at": "Thu Aug 22 00:46:20 +0000 2019",
      "id": 1164337974022217700,
      "id_str": "1164337974022217733",
      "text": "Antioxidant and anti-diabetic activities of polysaccharides from guava leaves. - https://t.co/3z91QV4t0r website is… https://t.co/VPTmzqdGi3",
      "truncated": true,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/3z91QV4t0r",
            "expanded_url": "http://fungov.co.uk/index.php/2019/08/21/antioxidant-and-anti-diabetic-activities-of-polysaccharides-from-guava-leaves/This",
            "display_url": "fungov.co.uk/index.php/2019…",
            "indices": [
              81,
              104
            ]
          },
          {
            "url": "https://t.co/VPTmzqdGi3",
            "expanded_url": "https://twitter.com/i/web/status/1164337974022217733",
            "display_url": "twitter.com/i/web/status/1…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "source": "<a href=\"http://fungov.co.uk\" rel=\"nofollow\">Barry Tweet</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 55072213,
        "id_str": "55072213",
        "name": "Total Well Being",
        "screen_name": "brrsmit406",
        "location": "UK",
        "description": "Diabetes Sufferer and keenly interested in healthcare, fitness and happiness!",
        "url": "https://t.co/ddCg57PRMk",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/ddCg57PRMk",
                "expanded_url": "http://fungov.co.uk",
                "display_url": "fungov.co.uk",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 748,
        "friends_count": 940,
        "listed_count": 7,
        "created_at": "Wed Jul 08 23:44:10 +0000 2009",
        "favourites_count": 17,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 37263,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1158380940432990209/adZogkUG_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1158380940432990209/adZogkUG_normal.jpg",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    }
]

```
</details>

<br/>

<details>
<summary>&nbsp; Example request:</summary>

<br/>

<pre>
<span class="sf-blue">SELECT</span> object_name : entities : hashtags[<span class="sf-green">0</span>] : text
<span class="sf-blue">FROM</span> table_name
</pre>

</details>

<br/>

<details>
<summary>&nbsp; Result:</summary>



<pre>AMCoffee</pre>

</details>