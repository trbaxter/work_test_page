# What is RBAC?

Role-Based Access Control is the means by which Snowflake secures database objects from 
unintended use by the wrong users.  

At the top of the role list is the **Account Administrator** (ACCOUNTADMIN).  
This role has the highest level of account privileges.  

Tangential to the ACCOUNTADMIN is the Organization Administrator (ORGADMIN).  
They have the unique ability to create new accounts. 

<br/>

The simplest kind of account privilege structure in Snowflake is like the following:

<br/>

```mermaid

%%{init:
    {
        "flowchart": 
        {
            "rankSpacing": 30,
            "nodeSpacing": 20
        }
    }
}%%

flowchart TD

%% AcctAdmin %%
acct([ACCOUNTADMIN]):::acct

%% SysAdmin %%
sys([SYSADMIN]):::sys

%% SecAdmin %%
sec([SECURITYADMIN]):::sec

%% UserAdmin %%
user([USERADMIN]):::user

%% OrgAdmin %%
org([ORGADMIN]):::org

%% Links %%
acct ~~~~  org
acct ---> sec
acct ---> sys ---> user



%% Class Colors %%
classDef acct stroke: #0f0, stroke-width: 2.5px;
classDef org stroke: #f00, stroke-width: 2.5px;
classDef sec stroke: #cc5500, stroke-width: 2.5px;
classDef sys stroke: #196de3, stroke-width: 2.5px;
classDef user stroke: #fff, stroke-width: 2.5px;
```