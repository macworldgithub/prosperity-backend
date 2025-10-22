import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { AddCustomerDto } from './dto/add-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private apiClient: ApiClientService,
    @InjectModel('Customer') private customerModel: Model<Customer>,
  ) {}

  async addCustomer(addCustomerDto: AddCustomerDto) {
    const response = await this.apiClient.soapCall(
      '/UtbCustomer',
      {
        customer: {
          ...addCustomerDto.customer,
          preferredContactMethod: 'EMAIL',
          orderNotificationEmail: addCustomerDto.customer.email,
          internetAccess: 'Y',
          company:
            addCustomerDto.customer.firstName + addCustomerDto.customer.surname,
        },
      },
      'addCustomer',
    );

    if (response.error) {
      throw new AppError(
        response.error.message || 'Failed to add customer',
        400,
      );
    }

    // Store in local DB
    await this.customerModel.create({
      custNo: response.return.custNo,
      ...addCustomerDto.customer,
    });

    return response;
  }

  async getServices(custNo: string) {
    if (!custNo) throw new AppError('Customer number is required', 400);
    return await this.apiClient.soapCall(
      '/UtbServices',
      { custNo },
      'getServices',
    );
  }

  async getDetails(custNo: string) {
    if (!custNo) throw new AppError('Customer number is required', 400);
    return await this.apiClient.soapCall(
      '/UtbCustomer',
      { customer: { custNo } },
      'getCustomer',
    );
  }

  async getBalance(custNo: string) {
    if (!custNo) throw new AppError('Customer number is required', 400);
    return await this.apiClient.soapCall(
      '/UtbCustomer',
      { customer: { custNo } },
      'getCurrBalance',
    );
  }

  private async deleteAccount(custNo: string, dob: string) {
    if (!custNo || !dob)
      throw new AppError('Customer number and date of birth are required', 400);
    return await this.apiClient.soapCall(
      '/UtbCustomer',
      {
        customer: {
          custNo,
          dob,
          category_status_customer: 'Disconnected',
        },
      },
      'updateCustomer',
    );
  }

  async deleteCustomer(custNo: string) {
    const details = await this.getDetails(custNo);
    if (details.error)
      throw new AppError(
        'Failed to retrieve customer details for deletion',
        400,
      );
    const dob = details.return?.dob;
    if (!dob) throw new AppError('Customer date of birth not found', 400);
    const result = await this.deleteAccount(custNo, dob);
    await this.customerModel.deleteOne({ custNo });
    return result;
  }
}
