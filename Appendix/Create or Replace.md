# Useful Create or Replace Functions

<br/>

- ### [Create API Integration](#create-api-integration)
- ### [Create External Function](#create-external-function)
- ### [Create File Format](#create-file-format)
- ### [Create Sequence](#create-sequence)
- ### [Create Table](#create-table)

<br/> <br/>
<br/> <br/>
<br/> <br/>

## Create API Integration

<pre>

<span class="sf-blue">CREATE </span>[<span class="sf-blue">OR</span> <span class="sf-green">REPLACE</span>] API <span 
class="sf-blue">INTEGRATION</span> 


Used in the Snowflake tutorial to set up API connections and run external API functions.
Not common, but good to be aware of. Documentation link <a href="https://docs.snowflake.
com/en/sql-reference/sql/create-api-integration">here</a>.
</pre>

<br/>

<pre>
<details><summary>&nbsp; Example:</summary>
<pre>
<span class="sf-blue">USE ROLE</span> ACCOUNTADMIN;

<span class="sf-blue">CREATE OR</span> <span class="sf-green">REPLACE</span> API <span class="sf-blue">INTEGRATION</span> dora_api_integration api_provider = aws_api_gateway api_aws_role_arn = 
<span class="sf-red">'arn:aws:iam::321463406630:role/snowflakeLearnerAssumedRole'</span> enabled = <span class="sf-green">true</span> api_allowed_prefixes = (<span class="sf-red">'https://awy6hshxy4.execute-api.us-west-2.amazonaws.com/dev/edu_dora')</span>;
</pre>
</details>
</pre>

<br/> <br/>
<hr/>
<br/> <br/>


## Create External Function

<pre>

<span class="sf-blue">CREATE</span> [<span class="sf-blue">OR</span> <span class="sf-green">REPLACE</span>] [SECURE] <span 
class="sf-blue">EXTERNAL FUNCTION</span> function_name (
       argument_name <span class="sf-green">DATATYPE</span>
     , argument_2_name <span class="sf-green">DATATYPE</span>
       ...   
)
RETURNS <span class="sf-green">DATATYPE</span>
API_INTEGRATION = api_integration_name
[CONTEXT_HEADERS = (...)]
<span class="sf-blue">AS </span> <span class="sf-red">'alias_name'</span>


Allows access to external API services by using a function to call executable code from outside Snowflake.
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/create-external-function">here</a>.


<span class="caution"><b><ins>CAUTION</ins>:</b></span> If sharing an external function through a listing, include <b>SECURE</b>.
</pre>



<br/> <br/>
<hr/>
<br/> <br/>



## Create File Format

<pre>
<span class="sf-blue">CREATE</span> [<span class="sf-blue">OR</span> <span class="sf-green">REPLACE</span>] FILE FORMAT format_name
       TYPE = <span class="sf-red">'file_type'</span>
       FIELD_DELIMITER = <span class="sf-red">'delimiter_type'</span>
       RECORD_DELIMITER = <span class="sf-red">'record_delimiter_type'</span>
       SKIP_HEADER = <span class="sf-green">#</span>
       
       
Other options available depending on file type used and cloud system. 
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/create-file-format">here</a>.
</pre>



<br/> <br/>
<hr/>
<br/> <br/>



## Create Sequence


<pre>

<span class="sf-blue">CREATE</span> [<span class="sf-blue">OR</span> <span class="sf-green">REPLACE</span>] <span 
class="sf-blue">SEQUENCE</span> sequence_name
       <span class="sf-blue">START</span> <span class="sf-green">beginning_value</span>
       <span class="sf-blue">INCREMENT</span> <span class="sf-green">increment_value</span>
       <span class="sf-blue">ORDER</span>
       <span class="sf-blue">COMMENT</span> = <span class="sf-red">'Some comment'</span>
 
       
Used to generate unique numbers across sessions and statements. Commonly employed for the creation of primary keys. 
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/create-sequence">here</a>.

<span class="note"><b><ins>NOTE</ins>:</b></span> ORDER has to be included if sequential order is desired. Otherwise, values will skip. 
      This is because performance is chosen over numerical consistency. 

<span class="tip"><b><ins>TIP</ins>:</b> </span>The .nextval function supplies the next generated value from the sequence. 

<span class="caution"><b><ins>CAUTION</ins>:</b></span> Using .nextvalue more than once in the same query (e.g. a.nextvalue(), a.nextvalue();) will cause skipping in the number sequence. 
         This is Snowflake's way of ensuring uniqueness.
</pre>

<br/> <br/>
<hr/>
<br/> <br/>

## Create Table

<pre>

<span class="sf-blue">CREATE </span>[<span class="sf-blue">OR</span> <span class="sf-green">REPLACE</span>] <span 
class="sf-blue">TABLE</span> table_name (
       column_name1 <span class="sf-green">VARCHAR</span>
       column_name2 <span class="sf-green">NUMBER</span>
       ...
)


Creates a table with the given column names and data types. 
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/create-table">here</a>.
</pre>

<br/> <br/>