import {Component} from "react";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

class ItemCard extends Component {

    render() {
        const item = this.props.item;
        const url = this.props.url;
        return (
            <div className="itemCard">
                <Card className="card">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontWeight={600} color="#d1b719">
                            {item.name}
                        </Typography>
                        {item.image_url?
                        <img className="itemImage"
                             src={item.image_url}
                             alt={item.name}
                             loading="lazy"
                        />:<i>No image</i>}
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`${url}/${item.id}`} className="detailsButton">Details</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default ItemCard;