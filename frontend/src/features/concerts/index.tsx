import { useEffect, useState } from "react";
import { Table, Card, Flex, Text, Button } from "@radix-ui/themes";
import { getConcert } from "@/services/concert.service";
import { TypeConcertAll } from "@/types/response/response.concert";
import DialogAddConcert from "./components/dialogAddConcert";
import DialogEditConcert from "./components/dialogEditConcert";
import AlertDialogDeleteConcert from "./components/alertDialogDeleteConcertt";
import DetailConcertDialog from "./components/DetailConcertDialog";

export default function ConcertsFeature() {
    const [concerts, setConcerts] = useState<TypeConcertAll[]>([]);
    const [selectedConcertId, setSelectedConcertId] = useState<string | null>(null);

    const getConcertsData = () => {
        getConcert().then((res) => {
            console.log(res);
            setConcerts(res.responseObject);
        });
    };

    useEffect(() => {
        getConcertsData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <Card 
                variant="surface" 
                className="max-w-screen-xl w-full mx-auto bg-white shadow-md rounded-lg p-6"
            >
                <Flex direction="row" justify="between" align="center" className="mb-4">
                <Text as="div" size="6" weight="bold" className="text-blue-600 text-3xl">
                    Concerts Management
                </Text>
                    <DialogAddConcert getConcertsData={getConcertsData} />
                </Flex>

                <Table.Root className="w-full border border-gray-200 rounded-md">
                    <Table.Header className="bg-gray-200">
                        <Table.Row>
                            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Concert Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Date & Time</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Rounds</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {concerts && concerts.map((concert: TypeConcertAll) => (
                            <Table.Row key={concert.concert_Id} className="hover:bg-gray-100">
                                <Table.RowHeaderCell>{concert.concert_Id}</Table.RowHeaderCell>
                                <Table.Cell>{concert.concert_name}</Table.Cell>
                                <Table.Cell>{new Date(concert.date_time).toLocaleString()}</Table.Cell>
                                <Table.Cell>{concert.description}</Table.Cell>
                                <Table.Cell>{concert.rounds}</Table.Cell>
                                <Table.Cell>{concert.status}</Table.Cell>
                                <Table.Cell>
                                    <Button 
                                        variant="outline"
                                        onClick={() => setSelectedConcertId(concert.concert_Id)}
                                    >
                                        View Details
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <DialogEditConcert 
                                        getConcertsData={getConcertsData}
                                        concert_Id={concert.concert_Id}
                                        concert_name={concert.concert_name}
                                        date_time={new Date(concert.date_time).toISOString()}
                                        description={concert.description}
                                        rounds={concert.rounds}
                                        status={concert.status}
                                        venue_id={concert.venue_id}
                                        artist_id={concert.artist_id}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <AlertDialogDeleteConcert 
                                        getConcertsData={getConcertsData}
                                        concert_Id={concert.concert_Id}
                                        concert_name={concert.concert_name}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                {selectedConcertId && (
                    <DetailConcertDialog
                        concert_Id={selectedConcertId}
                        onClose={() => setSelectedConcertId(null)} // ปิด dialog
                    />
                )}
            </Card>
        </div>
    );
}