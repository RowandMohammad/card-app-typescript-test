import Prisma from "../src/db";
import { server } from "../src/server";

// Define a fixed timestamp to be used across tests for determinism
const fixedTimestamp = new Date("2024-11-12T00:00:00.000Z");

// Helper functions for setup and teardown
beforeAll(async () => {
  await server.ready();
  await Prisma.entry.deleteMany();
});

beforeEach(async () => {
  await Prisma.entry.deleteMany(); // Clear entries before each test
});

afterAll(async () => {
  await server.close();
  await Prisma.$disconnect();
});

describe("API Endpoint Tests", () => {
  let entryId: string;

  // Common data used for creating entries
  const entryData = {
    title: "Test Entry",
    description: "A test description",
    scheduled_at: fixedTimestamp,
    created_at: fixedTimestamp,
  };

  // Test creating a new entry
  it("should create a new entry", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: entryData,
    });

    expect(response.statusCode).toBe(200);
    const data = response.json();
    expect(data.title).toBe(entryData.title);
    expect(data.description).toBe(entryData.description);

    // Save the entry ID for later tests if needed
    entryId = data.id;
  });

  // Test retrieving all entries
  it("should retrieve all entries", async () => {
    await Prisma.entry.create({
      data: entryData,
    });

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    const data = response.json();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(0);
  });

  // Test retrieving a specific entry by ID
  it("should retrieve a specific entry by ID", async () => {
    const entry = await Prisma.entry.create({
      data: entryData,
    });
    entryId = entry.id;

    const response = await server.inject({
      method: "GET",
      url: `/get/${entryId}`,
    });

    expect(response.statusCode).toBe(200);
    const data = response.json();
    expect(data.id).toBe(entry.id);
    expect(data.title).toBe(entryData.title);
    expect(data.description).toBe(entryData.description);
  });

  // Test updating an existing entry
  it("should update an existing entry", async () => {
    const entry = await Prisma.entry.create({
      data: entryData,
    });
    entryId = entry.id;

    const updatedData = {
      title: "Updated Entry",
      description: "Updated description",
      scheduled_at: fixedTimestamp,
      created_at: fixedTimestamp,
    };

    const response = await server.inject({
      method: "PUT",
      url: `/update/${entryId}`,
      payload: updatedData,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().msg).toBe("Updated successfully");

    // Verify the update
    const getResponse = await server.inject({
      method: "GET",
      url: `/get/${entryId}`,
    });
    const data = getResponse.json();
    expect(data.title).toBe(updatedData.title);
    expect(data.description).toBe(updatedData.description);
  });

  // Test deleting an entry by ID
  it("should delete an entry by ID", async () => {
    const entry = await Prisma.entry.create({
      data: entryData,
    });
    entryId = entry.id;

    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${entryId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().msg).toBe("Deleted successfully");

    // Ensure the entry no longer exists
    const getResponse = await server.inject({
      method: "GET",
      url: `/get/${entryId}`,
    });
    expect(getResponse.statusCode).toBe(500); // Should return an error if not found
  });
});
