<?php
/**
 * mongodb 简单连接类，后期完善
 */
namespace Common\Lib;
class Mconn{
    private $conn = null;
    private $db = null;
    public function __construct(){
        $config = C('MONGO');
        $this->db = $config['DB_NAME'];
        if($config['DB_USER'] && $config['DB_PWD'] ){
            $uri = "mongodb://".$config['DB_USER'].":".$config['DB_PWD']."@".$config['DB_HOST'];
        }else{
            $uri = "mongodb://".$config['DB_HOST'];
        }
        $this->conn = new \MongoDB\Driver\Manager($uri);
    }

    /**
     * @param $collname
     * @param $data
     * @return bool|mixed
     */
    public function insert($collname,$data){
        $bulk = new \MongoDB\Driver\BulkWrite();
        $id = $bulk->insert($data);
        $collname = $this->db.'.'.$collname;
        $writeConcern = new \MongoDB\Driver\WriteConcern(\MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $result = $this->conn->executeBulkWrite($collname, $bulk,$writeConcern);
        return array(
            'insertedCount' => $result->getInsertedCount(),
            'insertedId' => $id->__toString()
        );
    }

    /**
     * @param $collname
     * @param array $filter
     * @param array $options
     * 查询条件参考
     * http://php.net/manual/zh/mongodb-driver-query.construct.php
     * @return array
     */
    public function find($collname,$filter=[],$options=[]){
        $result = [];
        $query = new \MongoDB\Driver\Query($filter, $options);
        $collname = $this->db.'.'.$collname;
        $cursor = $this->conn->executeQuery($collname, $query);
        $res = $cursor->toArray();
        !empty($res) ? '' : $res = array();

        //通过json_encode + json_decode将数据转为数组
        $res = json_encode($res);
        $result = json_decode($res, true);
        return $result;
    }

    /**
     * @param $collname
     * @param $where ['userId'=>'10040'],  修改条件
     * @param $data  ['$set'=>['address'=>'4']], 修改内容
     * @param array $options ['multi' => false, 'upsert' => false]
     * @return boolean
     */
    public function update($collname,$where,$data,$options=[]){
        $bulk = new \MongoDB\Driver\BulkWrite();
        $options = empty($options) ? ['multi' => false, 'upsert' => false] : $options;
        $bulk->update($where, $data, $options);
        $writeConcern = new \MongoDB\Driver\WriteConcern(\MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $collname = $this->db.'.'.$collname;
        $res = $this->conn->executeBulkWrite($collname, $bulk, $writeConcern);
        return $res->getModifiedCount();
    }

    /**
     * @param $collname
     * @param $where ['_id'=>$id]; 删除条件
     * @return boolean
     */
    public function delete($collname,$where){
        $bulk = new \MongoDB\Driver\BulkWrite();
        $bulk->delete($where,['limit'=>0]);
        $writeConcern = new \MongoDB\Driver\WriteConcern(\MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $collname = $this->db.'.'.$collname;
        $res = $this->conn->executeBulkWrite($collname, $bulk, $writeConcern);
        return $res->getDeletedCount();
    }

    /**
     * 获取数据总条数
     * @param $collname 集合名称
     * @param $filter   过滤条件
     * @return mixed
     */
    public function count($collname,$filter){
        $commandCount = new \MongoDB\Driver\Command(array(
            'count' => $collname,
            'query' => $filter
        ));

        $itemCount = $this->conn->executeCommand($this->db, $commandCount);
        $info = $itemCount->toArray();
        return $info[0]->n;
    }
}