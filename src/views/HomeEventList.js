/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import EventCards from '../components/EventCards';
import NotFoundEvent from "../components/errors/NotFoundEvent";

import api from '../utils/api';
import LoadingSpinner from "../components/utils/LoadingSpinner";

const HomeEventList = (props) => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      return api.get('/events')
        .then(res => {
          setLoading(false);

          const events = res
            .filter(event => new Date(event.eventDate) >= new Date())
            .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
          return setEventList(events);
        })
        .catch(err => setLoading(false));
    }

    getEvents();
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      {!loading && eventList.length === 0 && <NotFoundEvent />}
      {loading && <LoadingSpinner loading={loading} />}

      {eventList.length > 0 &&
        <div>
          <Row noGutters className="page-header py-4">
            <PageTitle sm="8" title="Eventos Na Sua Área" className="text-sm-left" />
            <Col>
              <span style={{ color: '#007bff', float: 'right' }}>
                <Link to="/todos-eventos">Ver todos</Link>
              </span>
            </Col>
          </Row>

          <EventCards eventList={eventList} history={props.history} />
        </div>
      }
    </Container>
  );
}

export default HomeEventList;