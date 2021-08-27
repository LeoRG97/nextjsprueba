import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TooltipContainer = ({ tooltipText, placement, children }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">{props}</Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 200 }}
      overlay={renderTooltip(tooltipText)}
    >
      {children}
    </OverlayTrigger>
  );
};

TooltipContainer.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
};

TooltipContainer.defaultProps = {
  placement: 'left',
};

export default TooltipContainer;
