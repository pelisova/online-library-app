import { Test, TestingModule } from '@nestjs/testing';
import { BooksRentedService } from './books-rented.service';

describe('BooksRentedService', () => {
  let service: BooksRentedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksRentedService],
    }).compile();

    service = module.get<BooksRentedService>(BooksRentedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
