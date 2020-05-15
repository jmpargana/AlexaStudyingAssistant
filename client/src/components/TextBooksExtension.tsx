import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import Textbook from "../models/Textbook";
import Divider from '@material-ui/core/Divider';

export default function TextBooksExtension(props: {
  textbooks: Array<Textbook>;
}) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <Grid item>
      <Box m={3}></Box>
      <Typography variant="h3">Textbooks</Typography>
      {props.textbooks.map((text, index) => (
        <ExpansionPanel
          expanded={expanded === `panel${index}`}
          key={`panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{text.title}</Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <Typography>{text.body}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Grid>
  );
}
