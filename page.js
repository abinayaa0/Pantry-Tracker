'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, TextField, Typography, Stack, Modal, Button } from '@mui/material';
import { collection, query, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(true);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity > 0 ? quantity - 1 : 0 });
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ backgroundColor: '#F4F4F4' }} // Background color similar to HelloGetSafe
    >
      <Modal open={open} onClose={handleClose}>
        <Box position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="#FFFFFF"
          border="1px solid #D3D3D3"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" color="#333333">Add Item</Typography>
          <Stack width="100%"
            direction="row"
            spacing={2}
          >
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderColor: '#B0B0B0' } }} // Border color similar to HelloGetSafe
            />
            <Button variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
              sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }} // Green button similar to HelloGetSafe
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}
        sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }} // Green button similar to HelloGetSafe
      >
        Add New Item
      </Button>

      <Box border="1px solid #333333">
        <Box width="800px"
          height="100px"
          bgcolor="#2C3E50" // Dark blue similar to HelloGetSafe
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#FFFFFF">Inventory items</Typography>
        </Box>

        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor='#FFFFFF'
              padding={3}
              border="1px solid #D3D3D3"
            >
              <Typography variant='h3' color='#333333' textAlign='center'>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant='h3' color='#333333' textAlign='center'>
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => addItem(name)}
                  sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }} // Green button similar to HelloGetSafe
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() => removeItem(name)}
                  sx={{ backgroundColor: '#E74C3C', '&:hover': { backgroundColor: '#C0392B' } }} // Red button for Remove
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
