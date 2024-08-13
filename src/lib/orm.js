class FundORM {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async getAllFunds() {
    return this.dataSource.getFunds();
  }

  async getFundById(id) {
    return this.dataSource.getFundById(id);
  }

  async searchFunds(query) {
    const allFunds = await this.getAllFunds();
    return allFunds.filter(fund =>
      fund.name.toLowerCase().includes(query.toLowerCase()) ||
      fund.country.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default FundORM;