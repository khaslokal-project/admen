import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/CreditCard';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListAlt from '@material-ui/icons/ListAlt'
import SendIcon from '@material-ui/icons/NoteAdd';
import {Link} from 'react-router-dom'
 


export const mailFolderListItems = (
  
  <div>
    <ListItem button >
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Order Proccess" />
    </ListItem>


    <ListItem button component={Link} to="/Listproduct">
      <ListItemIcon>
        <ListAlt />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItem>

    <ListItem button component={Link} to="/sellers">
    <ListItemIcon>
      <ListAlt />
    </ListItemIcon>
    <ListItemText primary="Sellers" />
  </ListItem>
 
   
    <ListItem button component={Link} to="/listcategory">
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
  </div>
);
