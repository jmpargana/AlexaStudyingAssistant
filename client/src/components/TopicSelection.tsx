import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CreateTopic from "./CreateTopic";
import Topic from '../models/Topic';
import axios from "axios";
import { ObjectID } from "mongodb";
import {TopicContext} from "../context/context";

// URL with API endpoint to perform get requests
const topicAPI = "https://alexastudyingassistant.herokuapp.com/api/topics";

export default function TopicSelection() {
  const history = useHistory();
  const value = "";

  const { state, dispatch } = useContext(TopicContext);
  const topics = Object.keys(state).map(key => state[key].topic)

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await axios(topicAPI);
      result.data.map((topic: Topic) => dispatch({ type: 'UPLOAD_TOPIC', topic: topic}))
    };
    fetchTopics();
  }, []);

  function handleRoute(route: string) {
    let topicID: ObjectID;
    topics?.map(topic => topic["name"] === route ? topicID = topic["_id"] : null)
    history.push(`/topic/${topicID!.toString()}`);
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item>
        <Typography variant="h4">Create or join a topic:</Typography>
      </Grid>
      <Box m={2}></Box>
      <Grid item style={{ width: 300 }}>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: any) =>
            newValue ? handleRoute(newValue) : null
          }
          options={topics ? topics.map(topic => topic["name"]) : [""]}
          getOptionLabel={(option: string) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Topic name"
              variant="outlined"
            ></TextField>
          )}
        />
      </Grid>
      <Box m={2}></Box>
      <Grid item>
        <CreateTopic />
      </Grid>
    </Grid>
  );
}
