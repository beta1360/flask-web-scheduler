import dbcfg
import pymysql


class DBconn:

    def __init__(self):
        self.__conn = None

    def build(self):
        if self.__conn is None:
            self.__conn = pymysql.connect(
                host=dbcfg.HOST,
                port=dbcfg.PORT,
                user=dbcfg.USER,
                passwd=dbcfg.PWD,
                db=dbcfg.DB
            )

            return self.__conn

    def close(self):
        self.__conn.close()
