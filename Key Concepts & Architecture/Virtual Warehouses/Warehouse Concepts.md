# Warehouse Basics

<pre>
In Snowflake, warehouses <ins><b>do not store data</b></ins>. It's not an accurate naming convention.  
Rather, warehouses are the <span style="color: yellow;">centers of data computation.  
</pre>

<br/> <br/> 

# How Do They Work?

<pre>
The t-shirt size of a warehouse (XS, S, M, L, XL) denotes how many computational servers are available to work on your data.
Bigger warehouse size = more servers. 

 <span style="color: red;">**IMPORTANT**:</span> <ins>All Snowflake warehouses have a single cluster</ins> (until scaled out).  

It is NOT the cluster that changes with warehouse size scaling; <span style="color: aqua;"><ins>**it's the number of servers!**</ins></span>  
A cluster is just _a group of servers._
</pre>

<br/> <br/>

# Elastic Warehouse Scaling

<pre>
Certain high-usage enterprise accounts qualify for "elastic" warehouse scaling; the ability to increase
warehouse capability during high-demand peak-hours, and then have it scale back during off-times.
</pre>

<br/> <br/>

# Warehouses & Admins

<pre>
The warehouse menu can only be accessed by the ACCOUNTADMIN specifically because warehouse size affects costs.
</pre>