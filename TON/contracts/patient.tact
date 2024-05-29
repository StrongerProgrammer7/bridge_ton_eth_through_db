import "@stdlib/deploy";

message Registration {
    id: Int as uint256;
}

struct DocsAddress {
    docs_address: String;
}


message Push
{
    address: String;
}

message Remove
{
	address: String;
}


contract Patient with Deployable {
    parent: Address;
    owner: Address;
    id: Int as uint256;
    counter: Int as uint32;
    docs: map<Int,DocsAddress>;

    init(parent: Address, owner: Address)
    {
        self.parent = parent;
        self.owner = owner;
        self.counter = 0;
        self.id = 0;
    }

    receive(msg: Registration)
    {
        require(sender() == self.parent, "Parent only");
        self.id = msg.id;
    }
    receive(msg: Push)
    {
        require(sender() == self.owner, "Only owner!");
        self.docs.set(self.counter,DocsAddress{docs_address: msg.address });
        self.counter = self.counter + 1;
    }
	
	receive(msg: Remove)
	{
        require(sender() == self.owner, "Only owner!");
		let key: Int = 0;
		let newCount: Int = 0;
		let newMap: map<Int,DocsAddress> = emptyMap(); 
		while(key < self.counter)
		{

			if (self.docs.get(key) != null)
			{
				let temp: DocsAddress = self.docs.get(key)!!;
				if(sha256(msg.address) != sha256(temp.docs_address))
				{
					newMap.set(newCount,DocsAddress{docs_address: temp.docs_address});
					newCount = newCount + 1;
				}
			}
			key = key + 1;
		}
		self.counter = newCount;
		self.docs = newMap;
	}

    get fun counter(): Int
    {
        return self.counter;
    }

    get fun allDocs(): map<Int,DocsAddress>
    {
        return self.docs;
    }
}
