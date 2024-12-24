# What do you get with a new database?

Creation of a database automatically awards two schemas:

- Information Schema 
- Public Schema

<br/>


# What's the difference?

Information schemas cannot be deleted, dropped, renamed, or removed.  
They contain the metadata about the database and all the objects it contains. 

Public schemas _**can**_ be deleted/dropped/renamed/removed. They typically contain tables/views/sequences/etc. 

<br/>


# What goes where? 

Normal database objects (tables, views, sequences, and so on) should be stored in the <span style="color: yellow;">public schema.</span>

