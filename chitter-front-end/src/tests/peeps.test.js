import { render } from "@testing-library/react";
import samplePeeps from "../../../chitter-back-end/test/mock-data/samplePeeps.json";
import { MemoryRouter } from "react-router-dom";
import Peeps from "../components/Peeps";

describe("Peeps tests", () => {
    it("it should render a peep", () => {
        const mockPeeps = samplePeeps[0];
        render(<MemoryRouter><Peeps
            key={mockPeeps._id}
            userName={mockPeeps.author}
            peepText={mockPeeps.message}
            peepDate={mockPeeps.timeStamp}
            authorName={mockPeeps.name}
        /></MemoryRouter>)
        expect(mockPeeps._id).toBeInTheDocument;
    })
})