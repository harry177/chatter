import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Popover } from 'react-bootstrap';
import './SignUpPopover.styles.scss';

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>Just confirmation text</Popover.Body>
  </Popover>
);

export const SignUpPopover = () => (
  <OverlayTrigger trigger="click" placement="top" overlay={popover}>
    <span className="text-confirm">Please read</span>
  </OverlayTrigger>
);
