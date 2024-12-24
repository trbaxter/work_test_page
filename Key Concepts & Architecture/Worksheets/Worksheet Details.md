# Worksheet Menus

<pre>
The 4 drop-down menus found in the Snowflake worksheets are:  

a.) Database  
b.) Schema  
c.) Role  
d.) Warehouse  



The database and schema are referred to as the 'context' of the worksheet and serve as an optional 
aide to run content without having to specify the database and schema within the code explicitly. 

The role and warehouse are required in order to run the query and return a result.


Be aware that the worksheet context does <ins>NOT</ins> have to match the data source within the query you want to interact with.
This is totally okay. You just need to have an explicit reference to the data source you're attempting to query within the worksheet.


The term 'session' typically means a worksheet.. but there are other nuances.
More info on this available <a href="https://docs.snowflake.com/en/user-guide/session-policies">here</a>.
</pre>
