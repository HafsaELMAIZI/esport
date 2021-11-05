import {Component} from "react";
import {Card} from "@mui/material";
import dateFormat from "dateformat";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

class Serie extends Component {

    render() {
        const serie = this.props.serie;
        return (
          <div>
              <Card className="seriesCard" variant="outlined">
                  <h3>{serie.full_name}</h3>
                  <span>{serie.description}</span>
                  <h4>Video Game : {serie.videogame.name}</h4>
                  <span><b>From :</b> {dateFormat(serie.begin_at, "mmmm dS, yyyy HH:MM")}</span>
                  <span><b>Until : </b>{dateFormat(serie.end_at, "mmmm dS, yyyy HH:MM")}</span>
                  <span><b>{serie.winner_id ?
                      <Button component={Link} to={`/teams/${serie.winner_id}`} id="winnerDetailsButton">View Winner Details</Button>
                       : ''}
                  </b></span>
              </Card>
          </div>
        )
    }
}

export default Serie;