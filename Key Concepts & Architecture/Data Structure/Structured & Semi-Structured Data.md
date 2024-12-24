<pre>
In many modern environments, semi-structured data is typically more
popular than structured forms of data. 

Snowflake supports 5 different types of structured data formats:

<list>
<li>JSON</li> 
<li>XML</li>
<li>Parquet</li>
<li>Auro</li>
<li>Orc</li>
</list>
All of these can be handled using the <span class="sf-green">VARIANT</span> datatype. 
</pre>

<br/>
<hr/>
<br/>

<pre>
The standard SQL Entity-Attribute-Value format is embodied in the following table:

</pre>

|          Author           |                     |
|:-------------------------:|:-------------------:|
| &nbsp; First Name &nbsp;  | &nbsp; Edgar &nbsp; |
| &nbsp; Middle Name &nbsp; | &nbsp; Allen &nbsp; |
|  &nbsp; Last Name &nbsp;  |  &nbsp; Poe &nbsp;  |

<pre>
<b class="other">Author</b> represents the entity.
<b class="other">First Name, Middle Name,</b> and <b class="other">Last Name</b> represent the attributes.
<b class="other">Edgar, Allen,</b> and <b class="other">Poe</b> represent the values.
</pre>

<br/>
<hr/>
<br/>

<pre>
In JSON, there are some notable changes from the SQL data format.


<b class="other">Author</b> still represents the entity.
<b class="other">First Name, Middle Name,</b> and <b class="other">Last Name</b> represent keys.
<b class="other">Edgar, Allen,</b> and <b class="other">Poe</b> still represent value.


The combination of <b class="other">First Name</b> and <b class="other">Edgar</b> represent a key-value pair. 

<br/>
Other things to be aware of:

<li>Entities are encapsulated in curly braces '{}'.</li>
<li>Keys and values are separated by a colon (e.g. key:value).</li>
<li>Successive key-value pairs are separated by a comma.</li>
</pre>