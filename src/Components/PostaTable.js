import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Thead,Tr,Th,Tbody,Td,TableContainer,Table,Heading,Text} from '@chakra-ui/react'

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
const PostsTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
        const newData = response.data.hits;
        console.log(newData)
        setData(prevData => [...prevData, ...newData]);
        setPage(prevPage=>prevPage+1)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const interval = setInterval(fetchData, 10000);
    
      return () => clearInterval(interval);
    

    
  }, [page]);
// console.log(page)
  return (
   
    <TableContainer >
      <Heading mt={5}>Polling App</Heading>
      <Text style={{color:"red"}}>{page} pages loaded</Text>

  <Table variant='striped' colorScheme='teal' maxWidth='100%' m={5}>

   
    <Thead>
      <Tr >
        <Th fontSize='lg'>Title</Th>
        <Th  fontSize='lg'>URL</Th>
        <Th  fontSize='lg'>Created At</Th>
        <Th  fontSize='lg'>Author</Th>
      </Tr>
    </Thead>
    <Tbody>
         {data.map(post => (
          <Tr  key={post.objectID}>
            <Td>{post.title}</Td>
            <Td>
              <a style={{color:"blue"}} href={post.url} target="_blank" rel="noopener noreferrer">
                {post.url}
              </a>
            </Td>
            <Td>{post.created_at}</Td>
            <Td>{post.author}</Td>
          </Tr>
        ))}
      </Tbody>
   
  </Table>
</TableContainer>
  );
};

export default PostsTable;
