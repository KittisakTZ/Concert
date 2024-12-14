import { useEffect, useState } from "react";
import { Text, Button, Dialog, Flex, Box } from "@radix-ui/themes";
import { getConcertDetailsSql } from "@/services/concert.service";
import { TypeConcertDetails } from "@/types/response/response.concert";

type DetailConcertDialogProps = {
  concert_Id: string;
};

export default function DetailConcertDialog({ concert_Id }: DetailConcertDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<TypeConcertDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchConcertDetails = async () => {
        try {
          const concertDetails = await getConcertDetailsSql(concert_Id);
          console.log("Fetched Concert Details:", concertDetails); // Debug fetched data
          setDetails(concertDetails);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch concert details:", err);
          setError("Unable to fetch concert details. Please try again later.");
        }
      };
      fetchConcertDetails();
    }
  }, [isOpen, concert_Id]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setDetails(null); // Reset details when closing the dialog
  };

  return (
    <>
      <Button variant="ghost" onClick={handleOpen}>
        Detail
      </Button>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Title>Concert Details</Dialog.Title>
          <Dialog.Description>
            {error ? (
              <Text color="red">{error}</Text>
            ) : details ? (
              <Box>
                <Flex direction="column" gap="2">
                  <Text><strong>Concert Name:</strong> {details.concert_name}</Text>
                  <Text><strong>Date & Time:</strong> {new Date(details.date_time).toLocaleString()}</Text>
                  <Text><strong>Description:</strong> {details.description}</Text>
                  <Text><strong>Rounds:</strong> {details.rounds}</Text>
                  <Text><strong>Status:</strong> {details.concert_status}</Text>
                  <Text><strong>Created At:</strong> {new Date(details.concert_created_at).toLocaleString()}</Text>
                  <Text><strong>Updated At:</strong> {new Date(details.concert_updated_at).toLocaleString()}</Text>
                  <Text><strong>Venue Name:</strong> {details.venue_name}</Text>
                  <Text><strong>Venue Capacity:</strong> {details.venue_capacity}</Text>
                  <Text><strong>Venue Address:</strong> {details.venue_address}</Text>
                  <Text><strong>District:</strong> {details.venue_district}</Text>
                  <Text><strong>Province:</strong> {details.venue_province}</Text>
                  <Text><strong>Postal Code:</strong> {details.venue_postal_code}</Text>
                  <Text><strong>Artist Name:</strong> {details.artist_name}</Text>
                  <Text><strong>Artist Description:</strong> {details.artist_description}</Text>
                  <Text><strong>Total Seats:</strong> {details.total_seats}</Text>
                </Flex>
              </Box>
            ) : (
              <Text>Loading...</Text>
            )}
          </Dialog.Description>
          <Dialog.Close>
            <Button variant="outline" className="mt-4">Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}