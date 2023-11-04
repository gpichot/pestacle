import styled from "styled-components";

export const TimelineItemContent = styled.div`
  display: flex;
  padding: 0.7rem 0 1rem 12px;
`;
export const TimelineItemContentPhantom = styled(TimelineItemContent)`
  opacity: 0;
`;

export const TimelineItemBody = styled.div`
  &,
  & > * {
    font-size: 1.3rem !important;
    color: #ffffff !important;
  }
`;

export const TimelineItemTitle = styled.div`
  font-family: Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffffbb;
`;
