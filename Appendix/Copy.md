# Useful Copy Functions 

<br/>

- ### [Copy Into](#copy-into)

<br/> <br/>
<br/> <br/>
<br/> <br/>



## Copy Into

<pre>

<span class="sf-blue">COPY INTO</span> table_name
<span class="sf-blue">FROM</span> @[alias.]my_internal_stage
FILES = (<span class="sf-red">'file_name.extension'</span>)
FILE_FORMAT = (FORMAT_NAME = <span class="sf-red"> 'some_file_format'</span>)


Copies data from an internal stage into a given table. Uses a specified file format type. 
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/copy-into-table">here</a>.

<span class="tip"><ins><b>TIP</b></ins>:</span> Using the @ symbol tells Snowflake that the object in FROM is a stage object.

<span class="tip"><ins><b>TIP</b></ins>:</span> You can omit FILES to import everything from the stage all at once.

<span class="warning"><ins><b>WARNING</b></ins>:</span> Be aware that the string literals are case-sensitive. 
</pre>

<br/> <br/>