const sinon = require('sinon');
const { expect } = require('chai');
const { updateComments } = require('./api/controllers/transactionController');
const Transactions = require('./api/models/TransactionModel'); // Assuming this is your Mongoose model
const { successResponse, errorResponse } = require('./api/util/rest');
const { Messages } = require('./api/util/messages');
const httpCodes = require('./api/util/httpCodes'); 

describe('updateComments', () => {
    let req, res, sandbox;
  
    beforeEach(() => {
      // Create a sandbox for each test to ensure isolation
      sandbox = sinon.createSandbox();
      
      // Mock request and response objects
      req = {
        body: {
          id: '1',
          comments: 'New Comment'
        }
      };
      
      res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub().returnsThis()
      };
  
      // Stub the Transactions model's findOneAndUpdate method
      sandbox.stub(Transactions, 'findOneAndUpdate');
      
      // Stub the success and error response handlers
      sandbox.stub(successResponse);
      sandbox.stub(errorResponse);
      
      // Stub the Messages.say method
      sandbox.stub(Messages, 'say').returns('Records are updated');
    });
  
    afterEach(() => {
      // Restore the sandbox after each test
      sandbox.restore();
    });
  
    it('should update the comments and return success response', async () => {
      // Arrange
      const result = { id: '1', Comments: 'New Comment' };
      Transactions.findOneAndUpdate.resolves({ value: result });
  
      // Act
      await updateComments(req, res);
  
      // Assert
      expect(Transactions.findOneAndUpdate.calledOnceWith(
        { id: req.body.id },
        { $set: { Comments: req.body.comments } },
        { returnOriginal: false }
      )).to.be.true;
  
      expect(successResponse.calledOnceWith(res, 'Records are updated', result)).to.be.true;
    });
  
    it('should handle errors and return error response', async () => {
      // Arrange
      const error = new Error('Something went wrong');
      Transactions.findOneAndUpdate.rejects(error);
  
      // Act
      await updateComments(req, res);
  
      // Assert
      expect(Transactions.findOneAndUpdate.calledOnce).to.be.true;
      expect(errorResponse.calledOnceWith(res, httpCodes.serverError, Messages.systemError)).to.be.true;
    });
  });