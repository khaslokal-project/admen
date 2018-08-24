import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.modal
        };
    
        this.handleClosed = this.handleClosed.bind(this);        

        this.delete = this.delete.bind(this);
        this.close = this.close.bind(this);
    }
   

    render(){
        return(
            <div>
                <Dialog isOpen={this.state.modal}  onClosed={this.handleClosed}>
                    <DialogTitle>Konfirmasi</DialogTitle>
                    <DialogContent>
                    <DialogContentText>Apakah anda ingin menghapus produk  {this.props.data.name} ini?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.delete}>Ya</Button>{' '}
                        <Button color="secondary" onClick={this.close}>Tidak</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

     
    delete() {
        axios.delete(`${process.env.REACT_APP_API_URL}/products/${this.props.data.id}`)
            .then(res => {
                this.close();
                this.props.fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClosed() {
        this.props.closeModal();
    }

    close() {
        this.setState({
            modal: false
        });
    }
}

export default Delete;