# Useful Copy Functions 

<br/>

- ### [Copy Into](#copy-into)

<br/> <br/>
<br/> <br/>
<br/> <br/>



## Copy Into

```hiveql
COPY INTO table_name
FROM @my_internal_stage
FILES = ('file_name.extension')
FILE_FORMAT = (FORMAT_NAME = 'some_file_format')
```

<br/>

<p>
$\textcolor[rgb]{0,0.75,1}{\texttt{TESTING}}$
</p>

<br/>

Copies data from an internal stage into a given table. Uses a specified file format type. 
Documentation link <a href="https://docs.snowflake.com/en/sql-reference/sql/copy-into-table">here</a>.

> [!TIP] 
> Using the @ symbol tells Snowflake that the object in FROM is a stage object.  
>You can also omit FILES to import everything from the stage all at once.

<br/>

> [!WARNING]
> Be aware that the string literals are case-sensitive. 


<br/> <br/>
