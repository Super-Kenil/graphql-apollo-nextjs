import { gql } from "@apollo/client";

export const getLocations = gql`
  query GetLocations @api(name: flyby) {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export const getAllProjects = gql`
  query GetProjects @api(name: hygraph) {
    projects {
      name
      slug
      description
      image {
        id
        url
      }
    }
  }
`;

export const getProjectsWithPagination = gql`
  query GetProjectsWithPagination($skip: Int = 0) @api(name: hygraph) {
    projectsConnection(first: 2, skip: $skip) {
      aggregate {
        count
      }
      edges {
        node {
          name
          slug
          description
          image {
            id
            url
          }
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        pageSize
        hasPreviousPage
      }
    }
  }
`;

export const getProjectBySlug = gql`
  query SingleProject($slug: String! = "tribute-page") @api(name: hygraph) {
    project(where: { slug: $slug }) {
      name
      slug
      description
      image {
        url
      }
    }
  }
`;
