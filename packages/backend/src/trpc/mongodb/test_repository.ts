import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";

import { Test } from "./test";

const testSchema = new mongoose.Schema({
    info: String,
    user: String,
    status: String,
});

testSchema.methods.toJson = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

const TestModel = mongoose.model('Test', testSchema);

@Injectable()
export class TestRepository {
    async create(input: Test) {
        return TestModel.create(input);
    }
    async removeById(id: string) {
        return TestModel.findByIdAndDelete(id);
    }
    async updateById(id: string, input: Test) {
        return TestModel.findByIdAndUpdate(id, input);
    }
    async findById(id: string) {
        return TestModel.findById(id);
    }
    async findAll() {
        return TestModel.find();
    }
}