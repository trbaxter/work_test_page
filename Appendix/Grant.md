# Useful Grant Functions

<br/>

- ### [Grant Privileges to Role](#grant-privileges-to-role)

<br/> <br/>
<br/> <br/>
<br/> <br/>

## Grant Privileges to Role

<pre>

<span class="sf-blue">GRANT</span> IMPORTED <span class="sf-blue">PRIVILEGES</span>
<span class="sf-blue">ON DATABASE</span> database_name
<span class="sf-blue">TO ROLE</span> role_name


Allows a role in your account to use privileges that come with a shared database
provided by another Snowflake account or organization. 
Documentation link <a href="https://docs.snowflake.com/en/user-guide/data-exchange-marketplace-privileges">here</a>.

<span class="caution"><b><ins>CAUTION</ins>:</b></span> Don't interpret this as "gives one role the same privileges as another".
         The imported privileges are specific to Snowflake's secure data sharing
         feature, and apply <b><ins>only</ins></b> to privileges granted by the database owner. 
         
         Imported privileges are pre-defined for security purposes.
</pre>


<br/>